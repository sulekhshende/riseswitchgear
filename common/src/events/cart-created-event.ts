import { Subjects } from "./subjects";


export interface Products {
    panel: {
        id: string;
        title?: string;
        price: number;
        img?: string;
        description?: string;
        category?: string;
    };
    quantity: number;
}

export interface CartCreatedEvent {
    subject: Subjects.CartCreated;
    data: {
        id: string;
        userId: string;
        products: Products[];
        version: number;
    };
}