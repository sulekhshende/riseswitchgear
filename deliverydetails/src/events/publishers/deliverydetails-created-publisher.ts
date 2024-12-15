import { DeliveryDetailsCreatedEvent, Publisher, Subjects } from "@rsswitchgear/common";


export class DeliveryDetailsCreatedPublisher extends Publisher<DeliveryDetailsCreatedEvent>{
    subject: Subjects.DeliveryDetailsCreated = Subjects.DeliveryDetailsCreated;
}