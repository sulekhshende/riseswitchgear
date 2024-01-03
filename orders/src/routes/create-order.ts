import { BadRequestError, NotFoundError, OrderStatus, ValidateRequest, requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Panel } from "../models/panel";
import { Order } from "../models/order";
import { OrderCreatedPublisher } from "../events/publisher/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();
const EXPIRATION_WINDOW_SECONDS = 1 * 60;

router.post("/api/orders/",
    requireAuth,
    [
        body('panelId')
        .notEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('PanelId must be Provided')
    ],
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { panelId } = req.body;

        //Find the Panel the User is trying to Order in the Database
        const panel = await Panel.findById(panelId);
        if(!panel) {
            throw new NotFoundError();
        }

        //Make Sure the Panel is not already Reserved
        //Run query to look all the orders. Find an order where the panel
        //is the panel we just found and the orderstatus is not cancelled
        //If we find an order from that, it means panel is reserved
        const isReserved = await panel.isReserved();
        if(isReserved){
            throw new BadRequestError('Panel already reserved')
        }

        //Calculate expiration Date or time for this Order
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

        //Build and save Order to Database
        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            panel
        });

        await order.save();

        //Publish OrderCreated Event
        await new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            userId: order.userId,
            status: order.status,
            expiresAt: order.expiresAt.toISOString(),
            version: order.version,
            panel: {
                id: order.panel.id,
                price: order.panel.price
            }
        })
        res.status(201).send(order);
    }
);

export { router as createOrderRouter };