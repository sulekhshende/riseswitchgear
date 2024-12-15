import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import useRequest from '../../hooks/useRequest';
import axios from 'axios';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders/')
  });

  // useEffect(() => {
  //   const findTimeLeft = () => {
  //     const msLeft = new Date(order.expiresAt) - new Date();

  //     setTimeLeft(Math.round(msLeft / 1000));
  //   }

  //   findTimeLeft();
  //   const timerId = setInterval(findTimeLeft, 1000);

  //   return () => {
  //     clearInterval(timerId);
  //   }
  // }, [order]);
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
  
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
  
    // Automatically cancel order if time left is less than 0
    if (timeLeft < 0) {
      (async () => {
        try {
          await axios.delete(`/api/orders/cancel/${order.id}`);
          Router.push('/orders');
        } catch (error) {
          console.error('Cancellation failed:', error);
        }
      })();
    }
  
    return () => {
      clearInterval(timerId);
    };
  }, [order, timeLeft]);

  const handleCancel = async () => {
    try {
      await axios.delete(`/api/orders/cancel/${order.id}`);
      //await doRequest({}); // You may need to pass specific data for cancelling the order
      Router.push('/orders');
    } catch (error) {
      console.error('Cancellation failed:', error);
    }
  };

  // const handleAddDeliveryDetails = async () => {
  //   try {
  //     //await axios.post('/api/deliverydetails/');
  //     //await doRequest({}); // You may need to pass specific data for cancelling the order
  //     Router.push('/deliverydetails/add-delivery-details/')
  //   } catch (error) {
  //     console.error('deliveryaddress creation failed:', error);
  //   }
  // };

  const orderControl = (currentId, userId) => {
    if(currentId === userId) {
      return <Grid container spacing={2}>
        <Grid item>
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUB}
          amount={order.panel.price}
          email={currentUser.email}
          billingAddress={currentUser.address}
          description='user-purchased panel from riseswitchgear'
        />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => handleCancel()}>Cancel</Button>
        </Grid>
        {errors}
      </Grid>
    }
  }
//Router.push(`/orders/cancel/${order.id}`)
  if(timeLeft < 0 || order.status === 'completed' || order.status === 'cancelled'){
    return (
      <>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 2 }}>
          {/* <Box
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button variant="contained" sx={{ display: "flex", justifyContent: "center" }} onClick={() => handleAddDeliveryDetails()}>Add Delivery Details</Button>
          </Box> */}
        </Grid>
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Purchasing panel: {order.panel.title}</p>
            <small className="font-bold text-large">Price: {order.panel.price}</small>
            <h4 className="font-bold text-large">Status: {order.status}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={order.panel.img}
              width={270}
            />
          </CardBody>
        </Card>
      </>
    )
  }

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 2 }}>
      </Grid>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Purchasing panel: {order.panel.title}</p>
          <small className="font-bold text-large">Price: {order.panel.price}</small>
          <h4 className="font-bold text-large">Status: {order.status}</h4>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={order.panel?.img}
              width={270}
            />
        </CardBody>
          <h4 className="font-bold text-large">Time left to pay: {timeLeft} seconds</h4>
          {orderControl(currentUser.id, order.userId)}
        </CardHeader>
        
      </Card>
    </>
  )
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
}

export default OrderShow;