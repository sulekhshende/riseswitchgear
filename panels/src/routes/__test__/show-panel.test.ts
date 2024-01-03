import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';


it('returns 404 if a ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/panels/${id}`)
        .send()
        .expect(404);
});

it('returns a ticket if ticket is found', async () => {
    const title = 'MCC Panel';
    const price = 20;

    const response = await request(app)
        .post("/api/panels/")
        .set('Cookie', global.signin())
        .send({
            title,
            price
        })
        .expect(201);

    const panelResponse = await request(app)
        .get(`/api/panels/${response.body.id}`)
        .send()
        .expect(200);
        
    expect(panelResponse.body.title).toEqual(title);
    expect(panelResponse.body.price).toEqual(price);
});