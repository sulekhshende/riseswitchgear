import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

//an interface that describes properties that
//are required to create new user
interface PanelAttrs {
    title: string;
    description?: string;
    category?: string;
    price: number;
    userId: string;
    img?:string;
}

//an interface that decribes properties that
//a Panel Model has
interface PanelModel extends mongoose.Model<PanelDoc> {
    build(attrs: PanelAttrs) : PanelDoc
}

//an interface that decribes properties that
//a Panel Document has
interface PanelDoc extends mongoose.Document {
    title: string;
    description?: string;
    category?: string;
    price: number;
    userId: string;
    img?:string;
    version: number;
    orderId: string;
}

const panelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    orderId: {
        type: String
    }
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

panelSchema.set('versionKey', 'version');
panelSchema.plugin(updateIfCurrentPlugin);
panelSchema.statics.build = (attrs: PanelAttrs) => {
    return new Panel(attrs)
}

const Panel = mongoose.model<PanelDoc, PanelModel>('Panel', panelSchema);

export { Panel }