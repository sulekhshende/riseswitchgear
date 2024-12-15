import { 
    BadRequestError,
    NotAuthorizeError, 
    NotFoundError, 
    OrderStatus, 
    ValidateRequest, 
    requireAuth 
} from '@rsswitchgear/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/payments',
    requireAuth,
    [
        body('token')
            .not()
            .isEmpty(),
        body('orderId')
            .not()
            .isEmpty()    
    ],
    ValidateRequest,
    async(req: Request, res: Response) => {
<<<<<<< HEAD
        const { token, orderId, description, address } = req.body;
=======
        const { token, orderId, description } = req.body;
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83

        const order = await Order.findById(orderId);

        if(!order){
            throw new NotFoundError();
        };

        if(order.userId !== req.currentUser!.id){
            throw new NotAuthorizeError();
        };

        if(order.status === OrderStatus.Cancelled){
            throw new BadRequestError('Cannot pay for cancelled or expired Order');
        };

        const customer = await stripe.customers.create({
            source: token,
<<<<<<< HEAD
            email: req.currentUser!.email
=======
            name: 'Gourav Hammad',
            address: {
                line1: 'TC 9/4 Old MES colony',
                postal_code: '452331',
                city: 'Indore',
                state: 'Madhya Pradesh',
                country: 'India',
            }
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
        })
        
        const charge = await stripe.charges.create({
            currency: 'inr',
<<<<<<< HEAD
            amount: order.price * 100,
=======
            amount: order.price,
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
            //source: token,
            description: description,
            customer: customer.id,
        });
        
        const payment = Payment.build({
            orderId,
            stripeId: charge.id
        });

        await payment.save();

        await new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId
        })

        res.status(201).send({ id: payment.id });
    }
);

export { router as CreatePaymentRouter };