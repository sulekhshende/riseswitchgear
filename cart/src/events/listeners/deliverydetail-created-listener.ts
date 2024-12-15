import { Listener, DeliveryDetailsCreatedEvent, Subjects } from "@rsswitchgear/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Cart } from "../../models/cart";
import { CartUpdatedPublisher } from "../publishers/cart-updated-publisher";


export class DeliveryDetailCreatedListener extends Listener<DeliveryDetailsCreatedEvent>{
    subject: Subjects.DeliveryDetailsCreated = Subjects.DeliveryDetailsCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: DeliveryDetailsCreatedEvent['data'], msg: Message){
        const cart = await Cart.findById(data.cart!.id);

        if(!cart){
            throw new Error('cart not found');
        }

        cart.set({ deliveryDetailId: data.id });

        await cart.save();
        await new CartUpdatedPublisher(this.client).publish({
            id: cart.id,
            userId: cart.userId,
            deliveryDetailId: cart.deliveryDetailId,
            version: cart.version
        });

        msg.ack();
    }
}