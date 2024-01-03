import { Publisher } from "./base-publisher";
import { PanelCreatedEvent } from "./panel-created-event";
import { Subjects } from "./subjects";


export class PanelCreatedPublisher extends Publisher<PanelCreatedEvent>{
    subject: Subjects.PanelCreated = Subjects.PanelCreated;

}