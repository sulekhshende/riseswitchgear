import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {

    process.env.JWT_KEY = "asdfc";

    const mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        UseNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      } as ConnectOptions)
    //await mongoose.connect(mongoUri, {})
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

// afterAll(async () => {

//     await mongoose.connection.close()
 
//     await mongo.stop()
 
//  });

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
      }
      await mongoose.connection.close();
});

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201)

    const cookie = response.get('Set-Cookie');

    return cookie;
}