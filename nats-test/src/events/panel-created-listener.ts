import { Listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { PanelCreatedEvent } from "./panel-created-event";
import { Subjects } from "./subjects";

export class PanelCreatedListener extends Listener<PanelCreatedEvent> {
    readonly subject: Subjects.PanelCreated = Subjects.PanelCreated;
    queueGroupName = 'payments-service';
    
    onMessage(data: PanelCreatedEvent['data'], msg: Message): void {
        console.log(
            'Event Recived!',
            data
        )
        console.log(data.id)
        console.log(data.title)
        console.log(data.price)

        msg.ack();
    }
}