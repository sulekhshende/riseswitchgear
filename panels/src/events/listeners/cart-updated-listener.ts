import { Listener, CartUpdatedEvent, Subjects } from "@rsswitchgear/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Panel } from "../../models/panel";
import { PanelUpdatedPublisher } from "../publishers/panel-updated-publisher";


export class CartUpdatedListener extends Listener<CartUpdatedEvent>{
    subject: Subjects.CartUpdated = Subjects.CartUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: CartUpdatedEvent['data'], msg: Message){
        // const panel = await Panel.findById(data);

        // if(!panel){
        //     throw new Error('Panel not found');
        // };

        // panel.set({ orderId: undefined });
        // await panel.save();

        // await new PanelUpdatedPublisher(this.client).publish({
        //     id: panel.id,
        //     title: panel.title,
        //     price: panel.price,
        //     userId: panel.userId,
        //     orderId: panel.orderId,
        //     version: panel.version
        // });

        for (const product of data.products!) {
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