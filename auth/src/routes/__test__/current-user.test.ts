import request from 'supertest';
import { app } from '../../app';

it('responds with correct details of current user', async() => {
    const cookie = await global.signin()

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

        expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async() => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

        expect(response.body.currentUser).toEqual(null);
});

//with requireAuth middleware in currentUser Route
// it('response with error if not authenticated', async () => {
//     const response = await request(app)
//         .get('/api/users/currentuser')
//         .send()
//         .expect(401);
 
//     expect(response.body.errors[0].message).toEqual('Not Authorized');
// });