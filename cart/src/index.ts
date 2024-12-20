import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { PanelCreatedListener } from './events/listeners/panel-created-listener';
import { PanelUpdatedListener } from './events/listeners/panel-updated-listener';

const start = async () => {

    if(!process.env.JWT_KEY){
        throw new Error('JWT is not defined');
    }

    if(!process.env.MONGO_URI){
        throw new Error('Mongo Uri is not defined');
    }

    if(!process.env.NATS_CLUSTER_ID){
        throw new Error('NATS_CLUSTER_ID is not defined');
    }

    if(!process.env.NATS_CLIENT_ID){
        throw new Error('NATS_CLIENT_ID is not defined');
    }

    if(!process.env.NATS_URL){
        throw new Error('NATS_URL is not defined');
    }

    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        natsWrapper.client.on('close', () => {
            console.log('NATS Client Close!');
            process.exit();
        });
        
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        new PanelCreatedListener(natsWrapper.client).listen();
        new PanelUpdatedListener(natsWrapper.client).listen();

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    };

    app.listen(3000, () => {
        console.log('cart app started listening on port 3000');
    });
};

start();