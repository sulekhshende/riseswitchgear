import { requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { DeliveryDetailsCreatedPublisher } from "../events/publishers/deliverydetails-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { DeliveryDetails } from "../models/deliverydetails";

const router = express.Router();

router.post("/api/deliverydetails/",
    requireAuth,
    async (req: Request, res: Response) => {
        const { buyername, email, contactnumber, address, city, pincode, state, country } = req.body;


        //Build and save Order to Database
        const buyerDetails = DeliveryDetails.build({
            buyername: buyername,
            email: email,
            contactnumber: contactnumber,
            address: address,
            city: city,
            pincode: pincode,
            state: state,
            country: country,
            userId: req.currentUser!.id
        });

        await buyerDetails.save();

        //Publish AddressAdded Event
        await new DeliveryDetailsCreatedPublisher(natsWrapper.client).publish({
            id: buyerDetails.id,
            buyername: buyerDetails.buyername,
            email: buyerDetails.email,
            contactnumber: buyerDetails.contactnumber,
            address: buyerDetails.address,
            city: buyerDetails.city,
            pincode: buyerDetails.pincode,
            state: buyerDetails.state,
            country: buyerDetails.country,
            version: buyerDetails.version
        })
        res.status(201).send(buyerDetails);
    }
);

export { router as createdeliverydetailsRouter };