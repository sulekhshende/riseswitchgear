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
<<<<<<< HEAD
        deliveryDetailId?: string;
        cartId?: string;
=======
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
    };
}