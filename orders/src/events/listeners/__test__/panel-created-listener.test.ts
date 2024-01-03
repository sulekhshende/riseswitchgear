import { PanelCreatedEvent } from "@rsswitchgear/common";
import { natsWrapper } from "../../../nats-wrapper";
import { PanelCreatedListener } from "../panel-created-listener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Panel } from "../../../models/panel";


const setup = async() => {
    //create an instance of listener
    const listener = new PanelCreatedListener(natsWrapper.client);

    //create a fake data event
    const data: PanelCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'MCC Panel',
        price: 823,
        userId: new mongoose.Types.ObjectId().toHexString()
    };

    //create a fake message object
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg };
};

it('creates and saves ', async() => {
    const { listener, data, msg } = await setup();

    //call the on Message with fake data event + fake message object
    await listener.onMessage(data, msg);

    //write assertion to make sure a panel was created
    const panel = await Panel.findById(data.id);

    expect(panel).toBeDefined();
    expect(panel!.id).toEqual(data.id);
    expect(panel!.title).toEqual(data.title);
});

it('acks the message', async() => {
    const { listener, data, msg } = await setup();
    //call the on Message with fake data event + fake message object
    await listener.onMessage(data, msg);

    //write assertion to make sure a message was acked
    expect(msg.ack).toHaveBeenCalled();
});