import { NotAuthorizeError, NotFoundError, requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart";

const router = express.Router();

router.get("/api/cart/:cartId", 
    requireAuth,
    async (req: Request, res: Response) => {
        const cart = await Cart.findById(req.params.cartId).populate('panel')

        if(!cart){
            throw new NotFoundError();
        }

        if(cart.userId !== req.currentUser!.id){
            throw new NotAuthorizeError();
        }

        res.send(cart);
    }
);

export { router as showCartRouter };