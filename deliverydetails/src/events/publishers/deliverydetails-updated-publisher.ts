import { DeliveryDetailsUpdatedEvent, Publisher, Subjects } from "@rsswitchgear/common";


export class DeliveryDetailsUpdatedPublisher extends Publisher<DeliveryDetailsUpdatedEvent>{
    subject: Subjects.DeliveryDetailsUpdated = Subjects.DeliveryDetailsUpdated;
}