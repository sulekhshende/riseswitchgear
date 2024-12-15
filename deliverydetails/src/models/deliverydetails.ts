import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";


interface DeliveryDetailsAttrs {
    buyername: string;
    address: string;
    email: string;
    contactnumber: string;
    city: string;
    pincode: number;
    state: string;
    country: string;
    userId: string;
}

interface DeliveryDetailDoc extends mongoose.Document {
    buyername: string;
    email: string;
    contactnumber: string;
    address: string;
    city: string;
    pincode: number;
    state: string;
    country: string;
    orderId: string;
    userId: string;
    version: number;
}

interface DeliveryDetailsModel extends mongoose.Model<DeliveryDetailDoc> {
    build(attrs: DeliveryDetailsAttrs): DeliveryDetailDoc;
}

const DeliveryDetailsSchema = new mongoose.Schema({
    buyername: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactnumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    orderId: {
        type: String
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

DeliveryDetailsSchema.set('versionKey', 'version');
DeliveryDetailsSchema.plugin(updateIfCurrentPlugin);

DeliveryDetailsSchema.statics.build = (attrs: DeliveryDetailsAttrs) => {
    return new DeliveryDetails(attrs);
};

const DeliveryDetails = mongoose.model<DeliveryDetailDoc, DeliveryDetailsModel>('DeliveryDetails', DeliveryDetailsSchema);

export { DeliveryDetails };

