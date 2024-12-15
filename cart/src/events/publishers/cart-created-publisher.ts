import { CartCreatedEvent, Publisher, Subjects } from "@rsswitchgear/common";


export class CartCreatedPublisher extends Publisher<CartCreatedEvent>{
    subject: Subjects.CartCreated = Subjects.CartCreated;
}