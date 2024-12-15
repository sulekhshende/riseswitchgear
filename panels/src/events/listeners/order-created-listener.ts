import { Listener, OrderCreatedEvent, Subjects } from "@rsswitchgear/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Panel } from "../../models/panel";
<<<<<<< HEAD
import { PanelUpdatedPublisher } from "../publishers/panel-updated-publisher";
=======
import { PanelUpdatedPublisher } from "../panel-updated-publisher";
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83


export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){
<<<<<<< HEAD
        const panel = await Panel.findById(data.panel!.id);
=======
        const panel = await Panel.findById(data.panel.id);
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83

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
            version: panel.version
        });

        msg.ack();
    }
}