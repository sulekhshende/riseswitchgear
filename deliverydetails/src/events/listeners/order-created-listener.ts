import { Listener, OrderCreatedEvent, Subjects } from "@rsswitchgear/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { DeliveryDetails } from "../../models/deliverydetails";
import { DeliveryDetailsUpdatedPublisher } from "../publishers/deliverydetails-updated-publisher";


export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){
        const deliverydetail = await DeliveryDetails.findById(data.deliverydetail?.id);

        if(!deliverydetail){
            throw new Error('deliverydetail not found');
        }

        deliverydetail.set({ orderId: data.id });

        await deliverydetail.save();
        await new DeliveryDetailsUpdatedPublisher(this.client).publish({
            id: deliverydetail?.id,
            buyername: deliverydetail?.buyername,
            email: deliverydetail?.email,
            contactnumber: deliverydetail?.contactnumber,
            address: deliverydetail?.address,
            country: deliverydetail?.country,
            state: deliverydetail?.state,
            city: deliverydetail?.city,
            pincode: deliverydetail?.pincode,
            version: deliverydetail?.version,
            orderId: deliverydetail?.orderId,
        });

        msg.ack();
    }
}