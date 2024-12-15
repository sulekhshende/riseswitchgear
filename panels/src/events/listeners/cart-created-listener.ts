import { Listener, CartCreatedEvent, Subjects } from "@rsswitchgear/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Panel } from "../../models/panel";
import { PanelUpdatedPublisher } from "../publishers/panel-updated-publisher";


export class CartCreatedListener extends Listener<CartCreatedEvent>{
    subject: Subjects.CartCreated = Subjects.CartCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: CartCreatedEvent['data'], msg: Message){

        for (const product of data.products) {
            const panel = await Panel.findById(product.panel.id);

            if (!panel) {
                throw new Error('Panel not found');
            }

            panel.set({ cartId: data.id });

            await panel.save();
            await new PanelUpdatedPublisher(this.client).publish({
                id: panel.id,
                title: panel.title,
                price: panel.price,
                userId: panel.userId,
                cartId: panel.cartId,
                version: panel.version
            });
        }

        msg.ack();
    }
}