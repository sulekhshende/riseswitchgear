import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_KEY!, {
<<<<<<< HEAD
    apiVersion: "2023-10-16"
=======
    apiVersion: '2022-11-15'
>>>>>>> ede338690b4ab569aed5d400bd341eb94f5f3f83
});

