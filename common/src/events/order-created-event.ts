import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";
import { Products } from "./cart-created-event";

export interface OrderCreatedEvent {
    subject: Subjects.OrderCreated;
    data: {
        id: string;
        userId: string;
        expiresAt: string;
        status: OrderStatus;
        version: number;
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
        }
    }
}