import { NotFoundError, ValidateRequest, requireAuth } from "@rsswitchgear/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
//import mongoose from "mongoose";
import { Panel } from "../models/panel";
import { Cart } from "../models/cart";
import { CartCreatedPublisher } from "../events/publishers/cart-created-publisher";
import { natsWrapper } from "../nats-wrapper";
//import { DeliveryDetails } from "../models/deliverydetails";

const router = express.Router();

router.post(
    "/api/cart/",
    requireAuth,
    [
        body('products')
            .isArray({ min: 1 })
            .withMessage('Products must be an array with at least one item'),
        // body('products.*.panelId')
        //     .notEmpty()
        //     .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        //     .withMessage('PanelId must be provided and valid'),
        body('products.*.quantity')
            .isInt({ gt: 0 })
            .withMessage('Quantity must be a positive integer'),
    ],
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { products } = req.body;

        // Validate and fetch panels
        const productDetails = await Promise.all(
            products.map(async (product: { panelId: string, quantity: number }) => {
                console.log('panelId in cart create: ' + product.panelId)
                const panel = await Panel.findById(product.panelId);
                if (!panel) {
                    throw new NotFoundError();
                }
                return { panel, quantity: product.quantity };
            })
        );

        // Convert products to the correct format for the Cart model
        const cartProducts = productDetails.map(product => ({
            panel: product.panel.id,
            quantity: product.quantity,
        }));
        console.log('cart products: ' + cartProducts)
        // Build and save Cart to Database
        const cart = Cart.build({
            userId: req.currentUser!.id,
            products: cartProducts,
        });

        await cart.save();

        // Transform products for event publishing
        const productsForEvent = await Promise.all(
            cart.products.map(async product => {
                const panel = await Panel.findOne(product.panel);
                if (!panel) {
                    throw new NotFoundError();
                }
                return {
                    panel: {
                        id: panel.id,
                        title: panel.title,
                        price: panel.price,
                        img: panel.img,
                        description: panel.description,
                        category: panel.category,
                    },
                    quantity: product.quantity,
                };
            })
        );

        // Publish CartCreated Event
        await new CartCreatedPublisher(natsWrapper.client).publish({
            id: cart.id,
            userId: cart.userId,
            products: productsForEvent,
            version: cart.version,
        });

        res.status(201).send(cart);
    }
);

export { router as createCartRouter };

// router.post("/api/orders/",
//     requireAuth,
//     [
//         body('panelId')
//         .notEmpty()
//         .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
//         .withMessage('PanelId must be Provided')
//     ],
//     ValidateRequest,
//     async (req: Request, res: Response) => {
//         const { panelId } = req.body;

//         //Find the Panel the User is trying to add to cart in the Database
//         const panel = await Panel.findById(panelId);
//         if(!panel) {
//             throw new NotFoundError();
//         }


//         //Build and save Cart to Database
//         const cart = Cart.build({
//             userId: req.currentUser!.id,
//             products: req.body
//             //deliverydetail
//         });

//         await cart.save();

//         //Publish CartCreated Event
//         await new CartCreatedPublisher(natsWrapper.client).publish({
//             id: cart.id,
//             userId: cart.userId,
//             products: cart.products,
//             version: cart.version
//         })
//         res.status(201).send(cart);
//     }
// );

// export { router as createCartRouter };