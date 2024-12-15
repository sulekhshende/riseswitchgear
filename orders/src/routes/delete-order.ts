import { NotAuthorizeError, NotFoundError, OrderStatus, requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";
import { OrderCancelledPublisher } from "../events/publisher/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

<<<<<<< HEAD
router.delete("/api/orders/cancel/:orderId", 
=======
router.delete("/api/orders/:orderId", 
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
    requireAuth,
    async (req: Request, res: Response) => {

        const { orderId } = req.params;

<<<<<<< HEAD
        const order = await Order.findById(orderId).populate('panel').populate('deliverydetail');
=======
        const order = await Order.findById(orderId).populate('panel');
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83

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
<<<<<<< HEAD
                id: order.panel!.id
            },
            cart: {
                id: order.cart!.id
            },
            deliverydetail: {
                id: order.deliverydetail!.id
=======
                id: order.panel.id
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
            }
        })
        res.status(204).send(order);
    }
);

export { router as deleteOrderRouter };