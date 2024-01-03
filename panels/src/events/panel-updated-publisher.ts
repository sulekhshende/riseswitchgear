import { Publisher, Subjects, PanelUpdatedEvent } from '@rsswitchgear/common';

export class PanelUpdatedPublisher extends Publisher<PanelUpdatedEvent> {
    subject: Subjects.PanelUpdated = Subjects.PanelUpdated;
}