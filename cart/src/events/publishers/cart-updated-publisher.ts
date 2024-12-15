import { CartUpdatedEvent, Publisher, Subjects } from "@rsswitchgear/common";


export class CartUpdatedPublisher extends Publisher<CartUpdatedEvent>{
    subject: Subjects.CartUpdated = Subjects.CartUpdated;
}