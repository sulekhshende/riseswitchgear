import { Listener, DeliveryDetailsCreatedEvent, Subjects } from "@rsswitchgear/common";
import { Message } from "node-nats-streaming";
import { DeliveryDetails } from "../../models/deliverydetails";
import { queueGroupName } from "./queue-group-name";


export class DeliveryDetailCreatedListener extends Listener<DeliveryDetailsCreatedEvent> {
    subject: Subjects.DeliveryDetailsCreated = Subjects.DeliveryDetailsCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: DeliveryDetailsCreatedEvent['data'], msg: Message){
        const { id, buyername, address, email, contactnumber, city, pincode, state, country } = data;

        const deliverydetail = DeliveryDetails.build({
            id,
            buyername,
            address,
            email,
            contactnumber,
            city,
            pincode,
            state,
            country
        });
        await deliverydetail.save();
        msg.ack();
    };
};