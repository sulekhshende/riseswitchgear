import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Toolbar,
    Button,
} from "@mui/material";
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const DeliverydetailShow = ({ deliverydetail }) => {

  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      deliverydetailId: deliverydetail.id
    },
        //onSuccess: (order) => Router.push('/payments/deliverydetails')
    onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
  });

  return (
    <>
      <Grid container>
        <Grid item xs={0} sm={1} md={1} lg={2}></Grid>
        <Grid item xs={12} sm={10} md={10} lg={8} sx={{}}>
          <Toolbar id="back-to-top-anchor"/>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ mt: "0px", mb: "10px" }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: 44, fontWeight: 600, textAlign: "center" }}
              >
                {deliverydetail?.buyername}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ mt: "0px", mb: "10px" }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: 44, fontWeight: 600, textAlign: "center" }}
              >
                {deliverydetail?.email}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ mt: "0px", mb: "10px" }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: 44, fontWeight: 600, textAlign: "center" }}
              >
                {deliverydetail?.contactnumber}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ mt: "0px", mb: "10px" }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: 44, fontWeight: 600, textAlign: "center" }}
              >
                {deliverydetail?.city}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ mt: "0px", mb: "10px" }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: 44, fontWeight: 600, textAlign: "center" }}
              >
                {deliverydetail?.city}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ mt: "0px", mb: "10px" }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: 44, fontWeight: 600, textAlign: "center" }}
              >
                {deliverydetail?.state}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ mt: "0px", mb: "10px" }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: 44, fontWeight: 600, textAlign: "center" }}
              >
                {deliverydetail?.country}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ mt: "0px", mb: "10px" }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: 44, fontWeight: 600, textAlign: "center" }}
              >
                {deliverydetail?.pincode}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 2 }}>
              <Box
                component="div"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                  <Button variant="contained" sx={{ display: "flex", justifyContent: "center" }} onClick={() => doRequest()}>Details Confirmed</Button>
              </Box>
            </Grid>
            
          </Grid>
        </Grid>
        <Grid item xs={0} sm={1} md={1} lg={2}></Grid>
      </Grid>
    </>
  )
};

DeliverydetailShow.getInitialProps = async (context, client) => {
    const { deliverydetailId } = context.query;
    const { data } = await client.get(`/api/deliverydetail/${deliverydetailId}`);
  
    return { deliverydetail: data };
  }

export default DeliverydetailShow;