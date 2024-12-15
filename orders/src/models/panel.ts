import mongoose from "mongoose";
import { Order, OrderStatus } from "./order";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface PanelAttrs {
    id: string;
    title: string;
    price: number;
    img?: string;
    category? : string;
    description?: string;
}

export interface PanelDoc extends mongoose.Document {
    title: string;
    price: number;
    img?: string;
    category? : string;
    description?: string;
    version: number;
    isReserved(): Promise<boolean>;
}

interface PanelModel extends mongoose.Model<PanelDoc> {
    build(attrs: PanelAttrs): PanelDoc;
    findByEvent(event: { id: string, version: number }): Promise<PanelDoc | null>
}

const panelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    }
})

panelSchema.set('versionKey', 'version');
panelSchema.plugin(updateIfCurrentPlugin);

panelSchema.statics.findByEvent = (event: { id: string, version: number }) => {
    return Panel.findOne({
        _id: event.id,
        version: event.version - 1
    })
}
panelSchema.statics.build = (attrs: PanelAttrs) => {
    return new Panel({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
        img: attrs.img,
        category: attrs.category,
        description: attrs.description
    });
};

panelSchema.methods.isReserved = async function() {
    //this === the panel document that we just called 'isReserved'
    const existingOrder = await Order.findOne({
        panel: this.id,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    });

    return !!existingOrder;
}

const Panel = mongoose.model<PanelDoc, PanelModel>('Panel', panelSchema);

export { Panel };