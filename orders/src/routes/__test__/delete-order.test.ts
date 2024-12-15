import request from 'supertest';
import { app } from '../../app';
import { Panel } from '../../models/panel';
import { Order, OrderStatus } from '../../models/order';
import { natsWrapper } from '../../nats-wrapper';
import mongoose from 'mongoose';

it('changes orderstatus to cancel order', async() => {
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
        .delete(`/api/orders/${order.id}`)
        .set("Cookie", user)
        .send()
        .expect(204);    

    //expectationt to get orderstatus as cancelled
    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);    
});

it('publishes ordercancelled event', async() => {
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
        .delete(`/api/orders/${order.id}`)
        .set("Cookie", user)
        .send()
        .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();    
})