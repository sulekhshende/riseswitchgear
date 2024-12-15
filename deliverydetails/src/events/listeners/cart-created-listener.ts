import { Listener, CartCreatedEvent, Subjects } from "@rsswitchgear/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Cart } from "../../models/cart";
//import mongoose from "mongoose";


export class CartCreatedListener extends Listener<CartCreatedEvent>{
    subject: Subjects.CartCreated = Subjects.CartCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: CartCreatedEvent['data'], msg: Message) {
        const { id, userId, products } = data;

        const productDocs = products.map(product => ({
            panel: {
                id: product.panel.id,
                title: product.panel.title || '',
                price: product.panel.price,
                img: product.panel.img || '',
                category: product.panel.category || '',
                description: product.panel.description || ''
            },
            quantity: product.quantity
        }));

        const cart = Cart.build({
            id,
            userId,
            products: productDocs
        });

        await cart.save();
        msg.ack();
    }
    //     const productDoc : { panel: ProductAttrs, quantity: number }[] = [];

    //     for (const product of products) {
    //         const panel = await Cart.findById(product.panel.id);

    //         if (!panel) {
    //             throw new Error('Panel not found');
    //         }
            
    //         productDoc.push({
    //             panel: panel._id,
    //             quantity: product.quantity
    //         })
            
    //         const cart = Cart.build({
    //             id,
    //             userId,
    //             products: productDoc
    //         });

    //         await cart.save();
    //     }

    //     msg.ack();
    // }
}