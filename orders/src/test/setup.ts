import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { ConnectOptions } from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
}

jest.mock('../nats-wrapper');

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

global.signin = () => {
    //Build a JWT Payload 
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
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