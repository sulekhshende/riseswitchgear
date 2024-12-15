import nats from 'node-nats-streaming';
import { PanelCreatedPublisher } from './events/panel-created-publisher';

console.clear();

const stan = nats.connect('riseswitchgear', 'abc', {
    url: "http://localhost:4222",
});

stan.on('connect', async () => {
    console.log('Publisher Connected to nats')

    try {
        const publisher = new PanelCreatedPublisher(stan);
        await publisher.publish({
            id:'123',
            title:'MCC Panel',
            description:'Very good panel',
            price:45
        })
    } catch (err) {
        
    }

    // const data = JSON.stringify({
    //     id: '12345',
    //     title: 'MCC Panel',
    //     price: 45
    // });

    // stan.publish('panel:created', data, () => {
    //     console.log('Panel Created EVent Published')
    // })
})