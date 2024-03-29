import mongoose from "mongoose"
import { Order } from "../../../models/order"
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCancelledListener } from "../order-cancelled-listener"
import { OrderCancelledEvent, OrderStatus } from "@rsswitchgear/common"
import { Message } from "node-nats-streaming"


const setup = async() => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Cancelled,
        version: 0,
        price: 1244,
        userId: 'gvgdvc'
    });

    await order.save();

    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        version: 1,
        panel: {
            id: 'bhbhbc'
        }
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, order, msg };
};

it('updates the status of order',async() => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(data.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('acks the message', async() => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});