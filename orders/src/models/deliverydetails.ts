import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";


interface DeliveryDetailsAttrs {
    id: string;
    buyername: string;
    address: string;
    email: string;
    contactnumber: string;
    city: string;
    pincode: number;
    state: string;
    country: string;
}

export interface DeliveryDetailDoc extends mongoose.Document {
    buyername: string;
    email: string;
    contactnumber: string;
    address: string;
    city: string;
    pincode: number;
    state: string;
    country: string;
    version: number;
}

interface DeliveryDetailsModel extends mongoose.Model<DeliveryDetailDoc> {
    build(attrs: DeliveryDetailsAttrs): DeliveryDetailDoc;
    findByEvent(event: { id: string, version: number }): Promise<DeliveryDetailDoc | null>
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

DeliveryDetailsSchema.statics.findByEvent = (event: { id: string, version: number }) => {
    return DeliveryDetails.findOne({
        _id: event.id,
        version: event.version - 1
    })
}

DeliveryDetailsSchema.statics.build = (attrs: DeliveryDetailsAttrs) => {
    return new DeliveryDetails({
        _id: attrs.id,
        buyername: attrs.buyername,
        email: attrs.email,
        contactnumber: attrs.contactnumber,
        address: attrs.address,
        city: attrs.city,
        pincode: attrs.pincode,
        state: attrs.state,
        country: attrs.country
    });
};

const DeliveryDetails = mongoose.model<DeliveryDetailDoc, DeliveryDetailsModel>('DeliveryDetails', DeliveryDetailsSchema);

export { DeliveryDetails };

