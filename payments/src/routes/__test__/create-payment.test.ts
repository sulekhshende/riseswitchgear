import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { OrderStatus } from '@rsswitchgear/common';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payment';

//jest.mock('../../stripe');

it('returns 404 if purchasing an order that does not exist', async() => {
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'dbhcbd',
            orderId: new mongoose.Types.ObjectId().toHexString()
        })
        .expect(404)
});

it('returns 401 if purchasing an order that does not belong to the user', async() => {
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 5554,
        status: OrderStatus.Created
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'dbhcbd',
            orderId: order.id
        })
        .expect(401)
});

it('returns 400 if purchasing an Cancelled order', async() => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 5554,
        status: OrderStatus.Cancelled
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            token: 'dbhcbd',
            orderId: order.id
        })
        .expect(400)
});

it('returns a 201 with valid inputs', async() => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const price = 34300//Math.floor(Math.random() * 100000)
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: price,
        status: OrderStatus.Created
    });
    await order.save();

    const customer = await stripe.customers.create({
        source: 'tok_visa',
        name: 'Gourav Hammad',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    });
    
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin(userId))
        .send({
            token: 'tok_visa',
            orderId: order.id,
            description: 'panel payment',
            customer:customer.id
        })
        .expect(201);
    
    const chargeOptions = await stripe.charges.list({limit: 50});
    //console.log(chargeOptions)
    const stripeCharge = chargeOptions.data.find((charge) => {
        return charge.amount === price
    });
    
    expect(stripeCharge).toBeDefined();
    expect(stripeCharge!.currency).toEqual('inr');

    const payment = await Payment.findOne({
        orderId: order.id,
        stripeId: stripeCharge!.id
    })
    expect(payment).not.toBeNull();
    //expect(chargeOptions.source).toEqual('tok_visa');
    //expect(chargeOptions.amount).toEqual(5554 * 1000);
    //expect(chargeOptions.source).toEqual('tok_visa');
});

