import { Subjects } from "./subjects";


interface Panel {
    id: string;
    title?: string;
    price: number;
    img?: string;
    description?: string;
    category?: string;
}

interface Products {
    panel: Panel;
    quantity: number;
}

// interface DeliveryDetail {
//     id: string;
//     buyername?: string;
//     email: string;
//     contactnumber?: string;
//     address?: string;
//     country?: string;
//     state?: string;
//     city?: string;
//     pincode?: number;
// }

export interface CartUpdatedEvent {
    subject: Subjects.CartUpdated;
    data: {
        id: string;
        userId: string;
        version: number;
        products?: Products[];
        deliveryDetailId?: string;
        orderId?: string;
    };
}