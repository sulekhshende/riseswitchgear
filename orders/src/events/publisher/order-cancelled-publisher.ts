import { OrderCancelledEvent, Publisher, Subjects } from "@rsswitchgear/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}