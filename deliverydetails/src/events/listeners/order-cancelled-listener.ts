import { Listener, OrderCancelledEvent, Subjects } from "@rsswitchgear/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { DeliveryDetails } from "../../models/deliverydetails";
import { DeliveryDetailsUpdatedPublisher } from "../publishers/deliverydetails-updated-publisher";


export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    //here deliverydetail to be added in ordercancelled rsswitchgear event
    async onMessage(data: OrderCancelledEvent['data'], msg: Message){
        const deliveryDetail = await DeliveryDetails.findById(data.deliverydetail.id);

        if(!deliveryDetail){
            throw new Error('deliveryDetail not found');
        };
        // here deliverdetail.set orderid undefined
        deliveryDetail.set({ orderId: undefined });
        await deliveryDetail.save();

        await new DeliveryDetailsUpdatedPublisher(this.client).publish({
            id: deliveryDetail.id,
            email: deliveryDetail.email,
            contactnumber: deliveryDetail.contactnumber,
            orderId: deliveryDetail.orderId,
            version: deliveryDetail.version
        });

        msg.ack();
    }
}