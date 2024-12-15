import { Subjects } from "./subjects";
<<<<<<< HEAD
=======
import { OrderStatus } from "./types/order-status";

>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83

export interface OrderCancelledEvent {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        version: number;
        panel: {
            id: string;
<<<<<<< HEAD
        };
        deliverydetail: {
            id: string;
        };
        cart: {
            id: string;
        };
=======
        }
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
    }
}