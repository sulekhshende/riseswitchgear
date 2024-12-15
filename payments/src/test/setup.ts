import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { ConnectOptions } from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51K97DSSElZEvAnTRhx8f1xoCQsrkbqHMiiqmpUa5x3ZmDyExWeZCOYZoq4kaILJDdGJBFNQKM4GtoBGhB8zmhg0Q00A4I6SHJd';
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
    jest.clearAllMocks()
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

global.signin = (id?: string) => {
    //Build a JWT Payload 
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email : 'test@test.com',
    }    

    //Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    //Build the Session Object
    const session = { jwt: token }

    //Turn that session Object into required Json
    const sessionJson = JSON.stringify(session);

    //Take JSon and encoode it as base64
    const base64 = Buffer.from(sessionJson).toString('base64');

    //return a string thats the cookie with the encoded data
    return [`session=${base64}`];

}