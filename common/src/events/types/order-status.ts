export enum OrderStatus {
    //Created when the order is created but the 
    //panel it is trying to order has not been reseerved
    Created = 'created',
    
    //the panel the order is trying to reserve has already been resered
    //or when the user has cancelled the order
    //or the order expires before payment
    Cancelled = 'cancelled',

    //The order has succesfully reservex the panel
    AwaitingPayment = 'awaiting:payment',

    //the order has successfully reserved the panel and the user
    //has successfully provided payment
    Complete = 'complete'
}