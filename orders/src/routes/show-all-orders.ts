import { requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders/", 
    requireAuth,
    async (req: Request, res: Response) => {
        const orders = await Order.find({
            userId: req.currentUser!.id
        }).populate('panel')
        
        res.send(orders);
    }
);

export { router as showAllOrdersRouter };