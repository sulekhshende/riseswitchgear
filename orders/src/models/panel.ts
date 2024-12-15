<<<<<<< HEAD
=======
//import mongoose from 'mongoose'
//import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
//import { Order, OrderStatus } from './order'
 
// ### typescript defs
 
// describes the properties require for a new user
// interface PanelAttrs {
//     title: string
//     price: number
// }
 
// // properties of User Document
// interface PanelDoc extends mongoose.Document {
//     title: string
//     price: number
//     version: number
//     isReserved(): Promise<boolean>
// }
 
// // user model properties (adds the custom static func)
// interface PanelModel extends mongoose.Model<PanelDoc> {
//     build(attrs: PanelAttrs): PanelDoc
// }
 
 
// // ### Schema
// const panelSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true,
//         min: 0
//     },
// }, {
//     toJSON: {
//         transform(doc, ret) {
//             ret.id = ret._id
//             delete ret._id
//         }
//     }
// })
 
// panelSchema.set('versionKey', 'version')
// panelSchema.plugin(updateIfCurrentPlugin)
 
// // workaround so that ts can check params
// panelSchema.statics.build = (attrs: PanelAttrs) => {
//     return new Panel({
//         //_id: attrs.id,
//         title: attrs.title,
//         price: attrs.price
//     })
// }
 
// panelSchema.methods.isReserved = async function() {
//     const existingOrder = await Order.findOne({
//         panel: this,
//         status: {
//             $in: [
//                 OrderStatus.Created,
//                 OrderStatus.AwaitingPayment,
//                 OrderStatus.Complete
//             ]
//         }
//     })
 
//     return !!existingOrder
// }
 
// const Panel = mongoose.model<PanelDoc, PanelModel>('Panel', panelSchema)
 
 
// export { Panel, PanelDoc }

>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
import mongoose from "mongoose";
import { Order, OrderStatus } from "./order";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface PanelAttrs {
    id: string;
    title: string;
    price: number;
<<<<<<< HEAD
    img?: string;
    category? : string;
    description?: string;
=======
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
}

export interface PanelDoc extends mongoose.Document {
    title: string;
    price: number;
<<<<<<< HEAD
    img?: string;
    category? : string;
    description?: string;
=======
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
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
<<<<<<< HEAD
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
=======
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
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
<<<<<<< HEAD
        price: attrs.price,
        img: attrs.img,
        category: attrs.category,
        description: attrs.description
=======
        price: attrs.price
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
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