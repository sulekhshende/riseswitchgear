import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { PanelCreatedListener } from './events/panel-created-listener';

console.clear();

const stan = nats.connect('riseswitchgear', randomBytes(4).toString('hex'), {
    url: "http://localhost:4222"
});

stan.on('connect', () => {
    console.log('Listener Connected to NATS');

    stan.on('close', () => {
        console.log('NATS Client Closes!s')
        process.exit()
    })

    new PanelCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
