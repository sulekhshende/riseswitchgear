import { Listener, PanelUpdatedEvent, Subjects } from "@rsswitchgear/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Panel } from "../../models/panel";


export class PanelUpdatedListener extends Listener<PanelUpdatedEvent>{
    subject: Subjects.PanelUpdated = Subjects.PanelUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: PanelUpdatedEvent['data'], msg: Message){
        const panel = await Panel.findById(data.id)    

        if(!panel){
            throw new Error('Panel not found');
        };

        const { title, price, description, img } = data;
        panel.set({ title, price, description, img });
        await panel.save();

        msg.ack();
    };
};