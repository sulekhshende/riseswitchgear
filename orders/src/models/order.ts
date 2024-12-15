import { OrderStatus } from "@rsswitchgear/common";
import mongoose from "mongoose";
import { CartDoc } from "./cart";
import { PanelDoc } from "./panel";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { DeliveryDetailDoc } from "./deliverydetails";

export { OrderStatus };

interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    panel?: PanelDoc;
    cart?: CartDoc;
    deliverydetail?: DeliveryDetailDoc;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    version: number;
    panel?: PanelDoc;
    cart?: CartDoc;
    deliverydetail?: DeliveryDetailDoc;
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
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    deliverydetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryDetails'
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

