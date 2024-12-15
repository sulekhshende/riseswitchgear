import { Subjects } from "./subjects";

export interface OrderCancelledEvent {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        version: number;
        panel: {
            id: string;
        };
        deliverydetail: {
            id: string;
        };
        cart: {
            id: string;
        };
    }
}