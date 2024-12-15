import mongoose from "mongoose";
import { Panel } from "../../../models/panel";
import { natsWrapper } from "../../../nats-wrapper"
import { ExpirationCompleteListener } from "../expiration-complete-listener"
import { Order, OrderStatus } from "../../../models/order";
import { ExpirationCompleteEvent } from "@rsswitchgear/common";
import { Message } from "node-nats-streaming";


const setup = async() => {
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const panel = Panel.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'RCC Panel',
        price: 2548
    });

    await panel.save();

    const order = Order.build({
        status: OrderStatus.Created,
        userId: 'bvdgvc',
        expiresAt: new Date(),
        panel
    });

    await order.save();

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg, order, panel };
};

it('Updates the OrderStatus to be Cancelled', async() => {
    const { listener, data, msg, order, panel } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async() => {
    const { listener, data, msg, order, panel } = await setup();

    await listener.onMessage(data, msg);

    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])
    expect(eventData.id).toEqual(order.id);
});

it('acks the message', async() => {
    const { listener, data, msg, order, panel } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});