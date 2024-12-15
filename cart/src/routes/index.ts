import { requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart";

const router = express.Router();

router.get("/api/cart/", 
    requireAuth,
    async (req: Request, res: Response) => {
        const cart = await Cart.find({
            userId: req.currentUser!.id
        }).populate('panel')
        
        res.send(cart);
    }
);

export { router as showAllCartRouter };