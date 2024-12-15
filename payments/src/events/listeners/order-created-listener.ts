import { Listener, OrderCreatedEvent, Subjects } from "@rsswitchgear/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";


export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){
        const order = Order.build({
            id: data.id,
<<<<<<< HEAD
            price: data.panel!.price,
            status: data.status,
            userId: data.userId,
            buyername: data.deliverydetail!.buyername,
            address: data.deliverydetail!.address,
            email: data.deliverydetail!.email,
            contactnumber: data.deliverydetail!.contactnumber,
            city: data.deliverydetail!.city,
            pincode: data.deliverydetail!.pincode,
            state: data.deliverydetail!.state,
            country: data.deliverydetail!.country,
=======
            price: data.panel.price,
            status: data.status,
            userId: data.userId,
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
            version: data.version
        });

        await order.save();

        msg.ack();
    };
}