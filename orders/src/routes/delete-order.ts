import { NotAuthorizeError, NotFoundError, OrderStatus, requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";
import { OrderCancelledPublisher } from "../events/publisher/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete("/api/orders/cancel/:orderId", 
    requireAuth,
    async (req: Request, res: Response) => {

        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate('panel').populate('deliverydetail');

        if(!order){
            throw new NotFoundError();
        }

        if(order.userId !== req.currentUser!.id){
            throw new NotAuthorizeError();
        }

        order.status = OrderStatus.Cancelled;
        await order.save();

        await new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            panel: {
                id: order.panel!.id
            },
            cart: {
                id: order.cart!.id
            },
            deliverydetail: {
                id: order.deliverydetail!.id
            }
        })
        res.status(204).send(order);
    }
);

export { router as deleteOrderRouter };