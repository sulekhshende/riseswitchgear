import React from 'react';
import { useState } from "react";
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";   
//import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const AddDeliveryDetails = () => {

    const [buyername, setBuyername] = useState('');
    const [email, setEmail] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState();
    const [city, setCity] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/deliverydetails/',
        method: 'post',
        body: {
            buyername,email, pincode, city, state, country, contactnumber
        },
        //onSuccess: (deliverydetail) => Router.push('/deliverydetails/[deliverydetailId]', `/deliverydetails/${deliverydetail.id}`)
        onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
    });
  
    const handleClick = async (event) => {
      event.preventDefault();
  
      await doRequest();
    }

  return (
    <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    DeliveryDetails
                </Typography>

                <Box component="form"  noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
                    <TextField
                        margin="normal" 
                        required
                        fullWidth
                        id="buyername"
                        label="buyername"
                        value={buyername}
                        onChange={e => setBuyername(e.target.value)} 
                        name="buyername"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="email Address"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={pincode}
                        onChange={e => setPincode(e.target.value)} 
                        name="pincode"
                        label="pincode"
                        type="pincode"
                        id="pincode"
                        autoComplete="pincode"
                    />
                    <TextField
                        margin="normal" 
                        required
                        fullWidth
                        id="city"
                        label="city"
                        value={city}
                        onChange={e => setCity(e.target.value)} 
                        name="city"
                        autoFocus
                    />
                    <TextField
                        margin="normal" 
                        required
                        fullWidth
                        id="contactnumber"
                        label="contactnumber"
                        value={contactnumber}
                        onChange={e => setContactnumber(e.target.value)} 
                        name="contactnumber"
                        autoFocus
                    />
                    <TextField
                        margin="normal" 
                        required
                        fullWidth
                        id="country"
                        label="country"
                        value={country}
                        onChange={e => setCountry(e.target.value)} 
                        name="country"
                        autoFocus
                    />
                    <TextField
                        margin="normal" 
                        required
                        fullWidth
                        id="state"
                        label="state"
                        value={state}
                        onChange={e => setState(e.target.value)} 
                        name="state"
                        autoFocus
                    />
                    {errors}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleClick}
                    >
                        save details
                    </Button>
                    
                </Box>
            </Box>
                               
        </Container>
  )
}

export default AddDeliveryDetails;