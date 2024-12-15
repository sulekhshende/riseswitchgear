import { OrderCancelledEvent, OrderStatus } from "@rsswitchgear/common";
import { Panel } from "../../../models/panel";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";


const setup = async() => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = new mongoose.Types.ObjectId().toHexString();
    const panel = Panel.build({
        title: 'RCC Panel',
        price: 856,
        userId: 'sdvf'
    });
    panel.set({orderId });
    await panel.save();

    //create the fake data event
    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        panel: {
            id: panel.id,
        }
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, panel, data, msg }
};


it('updates panel, publishes event, acks the message', async() => {
    const { listener, panel, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedPanel = await Panel.findById(panel.id);
    
    expect(updatedPanel!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})