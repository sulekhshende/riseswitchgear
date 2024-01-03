import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';
import { Panel } from '../../models/panel';

it('returns a 404 if provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app)
        .put(`/api/panels/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'RG Motors',
            description:'Rg motors supply',
            price: 85
        })

        expect(response.status).toBe(404);
});

it('returns 401 if the user does not own panel', async () => {
    const title = 'MCC Panel';
    const response = await request(app)
        .post("/api/panels/")
        .set('Cookie', global.signin())
        .send({
            title: title,
            price:10
        })

    await request(app)
        .put(`/api/panels/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'RG Motors',
            description:'Rg motors supply',
            price: 85
        })
        .expect(401);
});

it('returns an error if invalid title is provided', async () => {
    await request(app)
        .post("/api/panels/")
        .set('Cookie', global.signin())
        .send({
            title: '',
            price:10
        })
        .expect(400);
});

it('returns an error if invalid price is provided', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post("/api/panels/")
        .set('Cookie', cookie)
        .send({
            title: 'MCC Panel',
            price:40
        })
        .expect(201);

    await request(app)
        .put(`/api/panels/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'RC Gear',
            price:-10
        })
        .expect(400);    
});


it('updates a panel with valid inputs', async () => {
    const cookie = global.signin();

    const title = 'MCC Panel';
    const response = await request(app)
        .post("/api/panels/")
        .set('Cookie', cookie)
        .send({
            title: title,
            price:10
        })
        .expect(201);

    await request(app)
        .put(`/api/panels/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'RC Gear',
            price: 20
        })
        .expect(200);

    const updatedPanel = await request(app)
        .get(`/api/panels/${response.body.id}`)
        .send();

    expect(updatedPanel.body.title).toEqual('RC Gear');
    expect(updatedPanel.body.price).toEqual(20);

});


it('publishes a panelUpdated event', async() => {
    const cookie = global.signin();

    const title = 'MCC Panel';
    const response = await request(app)
        .post("/api/panels/")
        .set('Cookie', cookie)
        .send({
            title: title,
            price:10
        })
        .expect(201);

    await request(app)
        .put(`/api/panels/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'RC Gear',
            price: 20
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});


it('rejects an update if panel is reserved', async() => {
    const cookie = global.signin();

    const title = 'MCC Panel';
    const response = await request(app)
        .post("/api/panels/")
        .set('Cookie', cookie)
        .send({
            title: title,
            price:10
        })
        .expect(201);

    const panel = await Panel.findById(response.body.id);
    panel!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
    await panel!.save();    

    await request(app)
        .put(`/api/panels/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'RC Gear',
            price: 20
        })
        .expect(400);
})