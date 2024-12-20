import { OrderStatus } from '@rsswitchgear/common';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderAttrs {
    id: string;
    status: OrderStatus;
    userId: string;
    price: number;
<<<<<<< HEAD
    buyername?: string;
    address?: string;
    email?: string;
    contactnumber?: string;
    city?: string;
    pincode?: number;
    state?: string;
    country?: string;
    version?: number;
=======
    version: number;
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
};

interface OrderDoc extends mongoose.Document {
    status: OrderStatus;
    userId: string;
    price: number;
<<<<<<< HEAD
    buyername?: string;
    address?: string;
    email?: string;
    contactnumber?: string;
    city?: string;
    pincode?: number;
    state?: string;
    country?: string;
=======
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
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
<<<<<<< HEAD
    buyername: {
        type: String,
    },
    email: {
        type: String
    },
    contactnumber: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: Number
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
=======
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
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

