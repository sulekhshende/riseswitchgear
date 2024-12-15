import { Subjects } from "./subjects";


export interface DeliveryDetailsUpdatedEvent {
    subject: Subjects;
    data : {
        id: string;
        buyername?: string;
        email: string;
        contactnumber: string;
        address?: string;
        country?: string;
        state?: string;
        city?: string;
        pincode?: number;
        version: number;
        orderId: string;
    };
}