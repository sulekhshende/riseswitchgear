import request from 'supertest';
import { app } from '../../app';
import { Panel } from '../../models/panel';
import mongoose from 'mongoose';

it('returns 404 if order is not found', async() => {
    const user = global.signin();

    const panel = Panel.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Rcc Panel',
        price: 65
    });
    await panel.save();

    const { body: order } = await request(app)
        .post("/api/orders")
        .set("Cookie", user)
        .send({ panelId: panel.id })
        .expect(201)

    await request(app)
        .get(`/api/orders/${order.id}`)
        .set("Cookie", global.signin())
        .send()
        .expect(401);
});

it('fetches a single order', async() => {

    const user = global.signin();

    const panel = Panel.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Rcc Panel',
        price: 65
    });
    await panel.save();

    const { body: order } = await request(app)
        .post("/api/orders")
        .set("Cookie", user)
        .send({ panelId: panel.id })
        .expect(201)

    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set("Cookie", user)
        .send()
        .expect(200);

    expect(fetchedOrder.id).toEqual(order.id)    
});
