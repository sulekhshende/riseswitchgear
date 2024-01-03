import { Listener, OrderCancelledEvent, Subjects } from "@rsswitchgear/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Panel } from "../../models/panel";
import { PanelUpdatedPublisher } from "../panel-updated-publisher";


export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message){
        const panel = await Panel.findById(data.panel.id);

        if(!panel){
            throw new Error('Panel not found');
        };

        panel.set({ orderId: undefined });
        await panel.save();

        await new PanelUpdatedPublisher(this.client).publish({
            id: panel.id,
            title: panel.title,
            price: panel.price,
            userId: panel.userId,
            orderId: panel.orderId,
            version: panel.version
        });

        msg.ack();
    }
}