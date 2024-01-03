import { OrderCreatedEvent, OrderStatus } from "@rsswitchgear/common";
import { Panel } from "../../../models/panel";
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";


const setup = async() => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const panel = Panel.build({
        title: 'RCC Panel',
        price: 856,
        userId: 'sdvf'
    });

    await panel.save();

    //create the fake data event
    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        userId: 'ggdgdg',
        expiresAt: 'gygc',
        status: OrderStatus.Created,
        version: 0,
        panel: {
            id: panel.id,
            price: panel.price
        }
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, panel, data, msg }
};

it('sets the orderId of panel', async() => {
    const { listener, data, msg, panel } = await setup();

    await listener.onMessage(data, msg);

    const updatedpanel = await Panel.findById(panel.id);

    expect(updatedpanel!.orderId).toEqual(data.id);
});

it('acks the message', async() => {
    const { listener, data, msg, panel } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a panel updated event', async() => {
    const { listener, data, msg, panel } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const panelUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(data.id).toEqual(panelUpdatedData.orderId);
}); 

