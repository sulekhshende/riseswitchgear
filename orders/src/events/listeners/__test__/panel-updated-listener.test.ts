import { PanelUpdatedEvent } from "@rsswitchgear/common";
import { natsWrapper } from "../../../nats-wrapper";
import { PanelUpdatedListener } from "../panel-updated-listener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Panel } from "../../../models/panel";


const setup = async() => {
    //create an instance of listener
    const listener = new PanelUpdatedListener(natsWrapper.client);

    //creates and saves a panel
    const panel = Panel.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'RCC Panel',
        price: 2348
    });
    await panel.save();

    //create a fake data event
    const data: PanelUpdatedEvent['data'] = {
        version: panel.version + 1,
        id: panel.id,
        title: 'new Title',
        price: 999,
        userId: 'bbbccc'
    };

    //create a fake message object
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg, panel };
};

it('finds, updates and saves a Panel', async() => {
    const { listener, data, msg, panel } = await setup();

    //call the on Message with fake data event + fake message object
    await listener.onMessage(data, msg);

    //finds updated panel
    const updatedPanel = await Panel.findById(panel.id);

    expect(updatedPanel!.version).toEqual(data.version);
    expect(updatedPanel!.price).toEqual(data.price);
    expect(updatedPanel!.title).toEqual(data.title);
});

it('acks the message', async() => {
    const { listener, data, msg } = await setup();
    //call the on Message with fake data event + fake message object
    await listener.onMessage(data, msg);

    //write assertion to make sure a message was acked
    expect(msg.ack).toHaveBeenCalled();
});

it('does not ack the message if version is skipped', async() => {
    const { listener, data, msg } = await setup();
    
    data.version = 15;

    try {
        await listener.onMessage(data, msg);
    } catch (err) {
        
    }

    //write assertion to make sure a message was acked
    expect(msg.ack).not.toHaveBeenCalled();
});