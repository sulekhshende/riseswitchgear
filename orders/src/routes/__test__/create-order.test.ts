import request from 'supertest';
import { app } from '../../app';
import { Panel } from '../../models/panel';
import { natsWrapper } from '../../nats-wrapper';
import mongoose from 'mongoose';
import { Order, OrderStatus } from '../../models/order';


<<<<<<< HEAD
it("returns an error if the panel does not exist", async () => {
    const panelId = new mongoose.Types.ObjectId();
    await request(app)
        .post("/api/panels/")
        .set('Cookie', global.signin())
        .send({ panelId })
=======
it("returns an error if the ticket does not exist", async () => {
    const ticketId = new mongoose.Types.ObjectId();
    await request(app)
        .post("/api/panels/")
        .set('Cookie', global.signin())
        .send({ ticketId })
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
        .expect(404);
});

it('returns and error if panel is reserved', async () => {
    const panel = Panel.build({
        id: new mongoose.Types.ObjectId().toHexString(),
<<<<<<< HEAD
        title: 'new panel',
=======
        title: 'new ticket',
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
        price: 52
    });
    await panel.save();

    const order = Order.build({
        panel,
        userId:'ndhcbhdbhcbdh',
        status: OrderStatus.Created,
        expiresAt: new Date()
    });
    await order.save();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({ panelId: panel.id })
        .expect(400);
});

it("reserves a panel", async () => {
    const panel = Panel.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'MCC Panel',
        price: 89
    });
    await panel.save();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({ panelId: panel.id })
        .expect(201)
})

it('publishes a panelCreated event', async() => {
    const title = 'MCC Panel';
    const panel = Panel.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title,
        price: 89
    });
    await panel.save();
    await request(app)
        .post("/api/orders")
        .set('Cookie', global.signin())
        .send({ panelId: panel.id })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
})