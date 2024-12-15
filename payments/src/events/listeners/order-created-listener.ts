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
            version: data.version
        });

        await order.save();

        msg.ack();
    };
}