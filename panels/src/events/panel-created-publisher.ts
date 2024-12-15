import { Publisher, Subjects, PanelCreatedEvent } from '@rsswitchgear/common';

export class PanelCreatedPublisher extends Publisher<PanelCreatedEvent> {
    subject: Subjects.PanelCreated = Subjects.PanelCreated;
}