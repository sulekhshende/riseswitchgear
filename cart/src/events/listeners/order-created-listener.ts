import { Listener, OrderCreatedEvent, Subjects } from "@rsswitchgear/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Cart } from "../../models/cart";
import { CartUpdatedPublisher } from "../publishers/cart-updated-publisher";


export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){
        const cart = await Cart.findById(data.cart!.id);

        if(!cart){
            throw new Error('cart not found');
        }

        cart.set({ orderId: data.id });

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