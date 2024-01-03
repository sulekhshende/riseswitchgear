import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successfull signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@gmail.com',
            password: "123456"
        })
        .expect(201)

});

it('returns a 400 on invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test',
            password: "123456"
        })
        .expect(400)

});

it('returns a 400 on invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@gmail.com',
            password: "123"
        })
        .expect(400)

});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'test@gmail.com'
        })
        .expect(400)

    await request(app)
        .post('/api/users/signup')
        .send({
            password:'123456'
        })
        .expect(400)    

});

it('disallows duplicate email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'test@gmail.com',
            password: '123456'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signup')
        .send({
            email:'test@gmail.com',
            password:'123456'
        })
        .expect(400)    

});

it('Sets a Cookie after Succesfull Signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email:'test@gmail.com',
            password:'123456'
        })
        .expect(201);
        
        expect(response.get('Set-Cookie')).toBeDefined()
})