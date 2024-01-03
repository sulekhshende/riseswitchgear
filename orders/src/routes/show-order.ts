import { NotAuthorizeError, NotFoundError, requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders/:orderId", 
    requireAuth,
    async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.orderId).populate('panel');

        if(!order){
            throw new NotFoundError();
        }

        if(order.userId !== req.currentUser!.id){
            throw new NotAuthorizeError();
        }

        res.send(order);
    }
);

export { router as showOrderRouter };