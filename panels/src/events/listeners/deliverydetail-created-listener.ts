import { Listener, DeliveryDetailsCreatedEvent, Subjects } from "@rsswitchgear/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Panel } from "../../models/panel";
import { PanelUpdatedPublisher } from "../publishers/panel-updated-publisher";


export class DeliveryDetailCreatedListener extends Listener<DeliveryDetailsCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: DeliveryDetailsCreatedEvent['data'], msg: Message){
        const panel = await Panel.findById(data.panel.id);

        if(!panel){
            throw new Error('Panel not found');
        }

        panel.set({ orderId: data.id });

        await panel.save();
        await new PanelUpdatedPublisher(this.client).publish({
            id: panel.id,
            title: panel.title,
            price: panel.price,
            userId: panel.userId,
            orderId: panel.orderId,
            deliveryDetailId: panel.deliveryDetailId,
            version: panel.version
        });

        msg.ack();
    }
}