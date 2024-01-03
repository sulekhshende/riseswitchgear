import { OrderCreatedEvent, Publisher, Subjects } from "@rsswitchgear/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}