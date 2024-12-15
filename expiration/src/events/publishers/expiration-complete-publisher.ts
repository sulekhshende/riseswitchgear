import { ExpirationCompleteEvent, Publisher, Subjects } from "@rsswitchgear/common";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}