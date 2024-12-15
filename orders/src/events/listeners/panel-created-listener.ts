import { Listener, PanelCreatedEvent, Subjects } from "@rsswitchgear/common";
import { Message } from "node-nats-streaming";
import { Panel } from "../../models/panel";
import { queueGroupName } from "./queue-group-name";


export class PanelCreatedListener extends Listener<PanelCreatedEvent> {
    subject: Subjects.PanelCreated = Subjects.PanelCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PanelCreatedEvent['data'], msg: Message){
<<<<<<< HEAD
        const { id, title, price, img, description, category } = data;
=======
        const { id, title, price } = data;
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83

        const panel = Panel.build({
            id,
            title,
<<<<<<< HEAD
            price,
            img,
            description,
            category
=======
            price
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
        });
        await panel.save();

        msg.ack();
    };
};