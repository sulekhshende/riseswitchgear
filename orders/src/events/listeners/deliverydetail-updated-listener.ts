import { Listener, DeliveryDetailsUpdatedEvent, Subjects } from "@rsswitchgear/common";
import { Message } from "node-nats-streaming";
import { DeliveryDetails } from "../../models/deliverydetails";
import { queueGroupName } from "./queue-group-name";


export class DeliveryDetailUpdatedListener extends Listener<DeliveryDetailsUpdatedEvent> {
    subject: Subjects.DeliveryDetailsUpdated = Subjects.DeliveryDetailsUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: DeliveryDetailsUpdatedEvent['data'], msg: Message){
        const deliverydetail = await DeliveryDetails.findById(data.id)    

        if(!deliverydetail){
            throw new Error('deliverydetail not found');
        };

        const { buyername, address, email, contactnumber, city, pincode, state, country } = data;
        deliverydetail.set({ buyername, address, email, contactnumber, city, pincode, state, country });
        await deliverydetail.save();

        msg.ack();
    };
};