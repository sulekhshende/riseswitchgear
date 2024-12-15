import { Listener, ExpirationCompleteEvent, Subjects, BadRequestError, OrderStatus } from "@rsswitchgear/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publisher/order-cancelled-publisher";


export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message){
        const order = await Order.findById(data.orderId);

        if(!order){
            throw new BadRequestError('Order not found');
        };

        if(order.status === OrderStatus.Complete){
            return msg.ack();
        };
        
        order.set({
            status: OrderStatus.Cancelled
        });

        await order.save();

        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            panel:{
                id: order.panel!.id
            },
            deliverydetail:{
                id: order.deliverydetail!.id
            },
            cart:{
                id: order.cart!.id
            }
        });

        msg.ack();
    };
};