import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
//import { PanelDoc } from "./panel";


interface PanelAttrs {
    id: string;
    title: string;
    price: number;
    img?: string;
    category?: string;
    description?: string;
}

interface ProductAttrs {
    panel: PanelAttrs;
    quantity: number;
}

interface ProductDoc extends mongoose.Document {
    panel: PanelAttrs;
    quantity: number;
}

interface CartAttrs {
    id: string;
    userId: string;
    products: ProductAttrs[];
}

interface CartDoc extends mongoose.Document {
    userId: string;
    deliveryDetailId?: string;
    products: ProductDoc[];
    version: number;
}

interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc;
    findByEvent(event: { id: string, version: number }): Promise<CartDoc | null>;
}

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    deliveryDetailId: {
        type: String
    },
    products: [{
        panel: {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            img: {
                type: String
            },
            category: {
                type: String
            },
            description: {
                type: String
            }
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

cartSchema.set('versionKey', 'version');
cartSchema.plugin(updateIfCurrentPlugin);

// cartSchema.statics.build = (attrs: CartAttrs) => {
//     return new Cart(attrs);
// };

cartSchema.statics.findByEvent = (event: { id: string, version: number }) => {
    return Cart.findOne({
        _id: event.id,
        version: event.version - 1
    })
}

cartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart(attrs);
};

// cartSchema.statics.build = (attrs: CartAttrs) => {
//     const products = attrs.products.map(product => ({
//         panel: (product.panel as any).id,
//         quantity: product.quantity
//     }));
//     return new Cart({ ...attrs, products });
// };

const Cart = mongoose.model<CartDoc, CartModel>('cart', cartSchema);

export { Cart };

