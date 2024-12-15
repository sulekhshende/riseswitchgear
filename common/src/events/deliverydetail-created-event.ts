import { Subjects } from "./subjects";


interface Products {
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


export interface DeliveryDetailsCreatedEvent {
    subject: Subjects;
    data : {
        id: string;
        buyername: string;
        email: string;
        contactnumber: string;
        address: string;
        country: string;
        state: string;
        city: string;
        pincode: number;
        version: number;
        panel?: {
            id: string;
            title?: string;
            price: number;
            img?: string;
            description?: string;
            category?: string;
        }
        cart?: {
            id: string;
            userId: string;
            products: Products[];
            version: number;
        }
    };
}