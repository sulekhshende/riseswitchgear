import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { useState } from 'react';

function DeliveryDetails({ panel }) {

  const[fullname,setFullName] = useState("");
  const[email,setEmail] = useState("");
  const[address,setAddress] = useState("");
  const[contactNumber,setContactNumber] = useState("");
  const[city,setCity] = useState("");
  const[state,setState] = useState("");
  const[country,setCountry] = useState("");
  const[pincode,setPincode] = useState("");

  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      panelId: panel.id
    },
    onSuccess: (order) => {
      deliverFormSubmit()
      Router.push('/orders/[orderId]', `/orders/${order.id}`)
    }
  });

  const deliverFormSubmit = async(e) => {
      e.preventDefault();
      try {
          const res = await axios.post("/api/payments/details/",({fullname,email, contactNumber, address, city, state, country, pincode}));
          return res;
          //Router.push('/orders/[orderId]', `/orders/${order.id}`)
      } catch (err) {
          console.log(err.msg)
      }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fullName"
            name="fullName"
            onChange={(e)=>setFullName(e.target.value)}
            label="Full name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            id="email"
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            onChange={(e)=>setAddress(e.target.value)}
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="contactnumber"
            name="contactnumber"
            label="ContactNumber"
            onChange={(e)=>setContactNumber(e.target.value)}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            onChange={(e)=>setCity(e.target.value)}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            onChange={(e)=>setState(e.target.value)}
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            onChange={(e)=>setPincode(e.target.value)}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            onChange={(e)=>setCountry(e.target.value)}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onClick={() => doRequest()}
          >
            Order
          </Button>  
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

DeliveryDetails.getInitialProps = async (context, client) => {
  const { panelId } = context.query;
  const { data } = await client.get(`/api/panels/${panelId}`);

  return { panel: data };
};

export default DeliveryDetails;