import { Listener, PanelCreatedEvent, Subjects } from "@rsswitchgear/common";
import { Message } from "node-nats-streaming";
import { Panel } from "../../models/panel";
import { queueGroupName } from "./queue-group-name";


export class PanelCreatedListener extends Listener<PanelCreatedEvent> {
    subject: Subjects.PanelCreated = Subjects.PanelCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PanelCreatedEvent['data'], msg: Message){
        const { id, title, price, img, description, category } = data;

        const panel = Panel.build({
            id,
            title,
            price,
            img,
            description,
            category
        });
        await panel.save();

        msg.ack();
    };
};