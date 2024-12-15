import mongoose from 'mongoose';

interface PaymentAttrs {
    orderId: string;
    stripeId: string;
};

interface PaymentDoc extends mongoose.Document {
    orderId: string;
    stripeId: string;
};

interface PaymentModel extends mongoose.Model<PaymentAttrs>{
    build(attrs: PaymentAttrs): PaymentDoc;
};

const PaymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
<<<<<<< HEAD
        required: true
    },
    stripeId: {
        type: String,
        required: true
    }
=======
        requireed: true
    },
    stripeId: {
        type: String,
        requireed: true
    },
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
    return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>('Payment', PaymentSchema);

export { Payment };

