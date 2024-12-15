import { BadRequestError, NotFoundError, OrderStatus, ValidateRequest, requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Cart } from "../models/cart";
import { Order } from "../models/order";
import { OrderCreatedPublisher } from "../events/publisher/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { DeliveryDetails } from "../models/deliverydetails";

const router = express.Router();
const EXPIRATION_WINDOW_SECONDS = 5 * 60;

router.post("/api/orders/",
    requireAuth,
    [
        body('deliveryDetailId')
        .notEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('DeliveryDetailId must be Provided')
    ],
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { deliveryDetailId } = req.body;

        //Find the Panel the User is trying to Order in the Database
        // const cart = await Cart.findById(cartId);
        // if(!cart) {
        //     throw new NotFoundError();
        // }

        //Make Sure the Panel is not already Reserved
        //Run query to look all the orders. Find an order where the panel
        //is the panel we just found and the orderstatus is not cancelled
        //If we find an order from that, it means panel is reserved
        // const isReserved = await panel.isReserved();
        // if(isReserved){
        //     throw new BadRequestError('Panel already reserved')
        // }

        let deliverydetail = await DeliveryDetails.findById(deliveryDetailId);
        if(!deliverydetail) {
            throw new NotFoundError();
        }

        //Calculate expiration Date or time for this Order
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

        //Build and save Order to Database
        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            //cart,
            deliverydetail
        });

        await order.save();

        //Publish OrderCreated Event
        await new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            userId: order.userId,
            status: order.status,
            expiresAt: order.expiresAt.toISOString(),
            
            // panel: {
            //     id: order.panel!.id,
            //     price: order.panel!.price,
            //     img: order.panel!.img,
            //     description: order.panel!.description,
            //     category: order.panel!.category
            // },
            deliverydetail: {
                id: order.deliverydetail?.id, 
                buyername: order.deliverydetail?.buyername,
                email: order.deliverydetail!.email, 
                contactnumber: order.deliverydetail?.contactnumber, 
                address: order.deliverydetail?.address, 
                country: order.deliverydetail?.country, 
                state: order.deliverydetail?.state, 
                city: order.deliverydetail?.city, 
                pincode: order.deliverydetail?.pincode
            },
            version: order.version
        })
        res.status(201).send(order);
    }
);

export { router as createOrderRouter };