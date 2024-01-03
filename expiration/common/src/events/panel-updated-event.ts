import { Subjects } from "./subjects";


export interface PanelUpdatedEvent {
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
        orderId?: string;
    };
}