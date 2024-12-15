import request from 'supertest';
import { app } from '../../app';
import { Panel } from '../../models/panel';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening to /api/panels requests', async () => {
    const response = await request(app)
        .post("/api/panels/")
        .send({})

        expect(response.status).not.toBe(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app)
        .post("/api/panels/")
        .send({})
        .expect(401);
});

it('return a status other than 401 if user is signed in', async () => {
    const response = await request(app)
        .post("/api/panels/")
        .set('Cookie', global.signin())
        .send({})

        expect(response.status).not.toEqual(401);
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
    await request(app)
        .post("/api/panels/")
        .set('Cookie', global.signin())
        .send({
            title: 'MCC Panel',
            price:'gvgcv'
        })
        .expect(400);

    await request(app)
        .post("/api/panels/")
        .set('Cookie', global.signin())
        .send({
            title: 'RC Gear',
            price:-10
        })
        .expect(400);    
});


it('creates a panel with valid inputs', async () => {
    let panel = await Panel.find({});
    expect(panel.length).toEqual(0);
    const title = 'MCC Panel';
    await request(app)
        .post("/api/panels/")
        .set('Cookie', global.signin())
        .send({
            title: title,
            price:10
        })
        .expect(201);

    panel = await Panel.find({});
    expect(panel.length).toEqual(1);
    expect(panel[0].title).toEqual(title);
    expect(panel[0].price).toEqual(10);
});

it('publishes a panelCreated event', async() => {
    const title = 'MCC Panel';
    await request(app)
        .post("/api/panels/")
        .set('Cookie', global.signin())
        .send({
            title: title,
            price:10
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
})