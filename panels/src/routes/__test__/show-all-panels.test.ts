import request from 'supertest';
import { app } from '../../app';

const createPanel = () => {
    return request(app)
        .post("/api/panels/")
        .set('Cookie', global.signin())
        .send({
            title: 'RCC Gear',
            price: 45
        })
}

it('returns all list of panels', async () => {
    await createPanel();
    await createPanel();
    await createPanel();
    await createPanel();

    const panelResponse = await request(app)
        .get("/api/panels/")
        .send()
        .expect(200);

     expect(panelResponse.body.length).toBe(4)   
});