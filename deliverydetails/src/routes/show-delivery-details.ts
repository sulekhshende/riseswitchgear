import { NotFoundError, requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { DeliveryDetails } from "../models/deliverydetails";

const router = express.Router();

router.get("/api/deliverydetails/:id", 
    requireAuth,
    async (req: Request, res: Response) => {
        const deliveryDetails = await DeliveryDetails.findById(req.params.id);

        if(!deliveryDetails){
            throw new NotFoundError();
        }

        res.send(deliveryDetails);
    }
);

export { router as showDeliveryDetailsRouter };