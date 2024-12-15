import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { PanelDoc } from "./panel";


// interface CartAttrs {
//     userId: string;
//     panel: PanelDoc;
//     //deliverydetail?: DeliveryDetailDoc;
// }

// interface CartDoc extends mongoose.Document {
//     userId: string;
//     version: number;
//     //deliverydetail?: DeliveryDetailDoc;
// }

// interface CartModel extends mongoose.Model<CartDoc> {
//     build(attrs: CartAttrs): CartDoc;
// }

interface ProductAttrs {
    panel: PanelDoc;
    quantity: number;
}

interface ProductDoc extends mongoose.Document {
    panel: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

interface CartAttrs {
    userId: string;
    products: ProductAttrs[];
}

interface CartDoc extends mongoose.Document {
    userId: string;
    deliveryDetailId: string;
    orderId: string;
    products: ProductDoc[];
    version: number;
}

interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc;
}

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    deliveryDetailId: {
        type: String
    },
    orderId: {
        type: String
    },
    products: [
        {
            panel: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Panel'
            },
            quantity: {
                type:Number,
                default:1,
            },
        },
    ]
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

cartSchema.statics.build = (attrs: CartAttrs) => {
    const products = attrs.products.map(product => ({
        panel: (product.panel as any).id,
        quantity: product.quantity
    }));
    return new Cart({ ...attrs, products });
};

const Cart = mongoose.model<CartDoc, CartModel>('cart', cartSchema);

export { Cart };

