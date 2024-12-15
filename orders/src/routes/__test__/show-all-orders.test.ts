import request from 'supertest';
import { app } from '../../app';
import { Panel } from '../../models/panel';
import mongoose from 'mongoose';

const buildPanel = async () => {
    const panel = Panel.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'College Panel',
        price: 78
    });

    await panel.save();

    return panel;
}

it('fetches orders for a particular user', async () => {
    //create three panels

    const panelOne = await buildPanel();
    const panelTwo = await buildPanel();
    const panelThree = await buildPanel();

    const userOne = global.signin();
    const userTwo = global.signin();
    //create one order for userOne and two orders for userTwo
    await request(app)
        .post("/api/orders")
        .set("Cookie", userOne)
        .send({ panelId: panelOne.id })
        .expect(201)

    const { body: orderOne } = await request(app)
        .post("/api/orders")
        .set("Cookie", userTwo)
        .send({ panelId: panelTwo.id })
        .expect(201)
        
    const { body: orderTwo } = await request(app)
        .post("/api/orders")
        .set("Cookie", userTwo)
        .send({ panelId: panelThree.id })
        .expect(201)    

    //Make request to get order for userTwo
    const response = await request(app)
        .get("/api/orders")
        .set("Cookie", userTwo)
        .expect(200)

    //make sure we get orders only for userTwo
    expect(response.body.length).toEqual(2);
    expect(response.body[0].id).toEqual(orderOne.id);
    expect(response.body[1].id).toEqual(orderTwo.id);
    expect(response.body[0].panel.id).toEqual(panelTwo.id);
    expect(response.body[1].panel.id).toEqual(panelThree.id);
})