import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";
<<<<<<< HEAD
import { Products } from "./cart-created-event";
=======

>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83

export interface OrderCreatedEvent {
    subject: Subjects.OrderCreated;
    data: {
        id: string;
        userId: string;
        expiresAt: string;
        status: OrderStatus;
        version: number;
<<<<<<< HEAD
        panel?: {
            id: string;
            title?: string;
            price: number;
            img?: string;
            description?: string;
            category?: string;
        },
        cart?: {
            id: string;
            products: Products[];
        },
        deliverydetail?: {
            id: string;
            buyername?: string;
            email: string;
            contactnumber?: string;
            address?: string;
            country?: string;
            state?: string;
            city?: string;
            pincode?: number;
=======
        panel: {
            id: string;
            title?: string;
            price: number;
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
        }
    }
}