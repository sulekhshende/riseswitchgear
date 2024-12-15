import request from 'supertest';
import { app } from '../../app';
import { Address } from '../../models/deliverydetails';
import { natsWrapper } from '../../nats-wrapper';
import mongoose from 'mongoose';


it("returns an error if the address does not exist", async () => {
    const addressId = new mongoose.Types.ObjectId();
    await request(app)
        .post("/api/addresss/")
        .set('Cookie', global.signin())
        .send({ addressId })
        .expect(404);
});
