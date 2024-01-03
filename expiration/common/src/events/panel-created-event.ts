import { Subjects } from "./subjects";


export interface PanelCreatedEvent {
    subject: Subjects;
    data : {
        id: string;
        title: string;
        description?: string;
        img?: string;
        price: number;
        category?: string;
        userId: string;
        version: number;
    };
}