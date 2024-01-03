import { OrderStatus } from '@rsswitchgear/common';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderAttrs {
    id: string;
    status: OrderStatus;
    userId: string;
    price: number;
    version: number;
};

interface OrderDoc extends mongoose.Document {
    status: OrderStatus;
    userId: string;
    price: number;
    version: number;
};

interface OrderModel extends mongoose.Model<OrderAttrs>{
    build(attrs: OrderAttrs): OrderDoc;
};

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        requireed: true
    },
    price: {
        type: Number,
        requireed: true
    },
    status: {
        type: String,
        requireed: true
    },
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
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        price: attrs.price,
        userId: attrs.userId,
        status: attrs.status
    });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };

