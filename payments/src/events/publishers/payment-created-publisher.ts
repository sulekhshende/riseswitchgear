import { PaymentCreatedEvent, Publisher, Subjects } from "@rsswitchgear/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}