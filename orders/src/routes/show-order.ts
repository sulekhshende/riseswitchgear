import { NotAuthorizeError, NotFoundError, requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders/:orderId", 
    requireAuth,
    async (req: Request, res: Response) => {
<<<<<<< HEAD
        const order = await Order.findById(req.params.orderId).populate('panel').populate('deliverydetail');
=======
        const order = await Order.findById(req.params.orderId).populate('panel');
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83

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