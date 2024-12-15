import { OrderStatus } from "@rsswitchgear/common";
import mongoose from "mongoose";
<<<<<<< HEAD
import { CartDoc } from "./cart";
import { PanelDoc } from "./panel";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { DeliveryDetailDoc } from "./deliverydetails";
=======
import { PanelDoc } from "./panel";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83

export { OrderStatus };

interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
<<<<<<< HEAD
    panel?: PanelDoc;
    cart?: CartDoc;
    deliverydetail?: DeliveryDetailDoc;
=======
    panel: PanelDoc;
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    version: number;
<<<<<<< HEAD
    panel?: PanelDoc;
    cart?: CartDoc;
    deliverydetail?: DeliveryDetailDoc;
=======
    panel: PanelDoc;
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
    panel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Panel'
<<<<<<< HEAD
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    deliverydetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryDetails'
=======
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('order', orderSchema);

export { Order };

