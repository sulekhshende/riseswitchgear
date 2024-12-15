import { Listener, OrderCancelledEvent, Subjects } from "@rsswitchgear/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Cart } from "../../models/cart";
import { CartUpdatedPublisher } from "../publishers/cart-updated-publisher";


export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message){
        const cart = await Cart.findById(data.cart!.id);

        if(!cart){
            throw new Error('cart not found');
        };

        cart.set({ orderId: undefined });
        await cart.save();

        await new CartUpdatedPublisher(this.client).publish({
            id: cart.id,
            userId: cart.userId,
            orderId: cart.orderId,
            version: cart.version
        });

        msg.ack();
    }
}