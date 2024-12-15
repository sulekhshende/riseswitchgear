import {
  Box,
  Typography,
  Grid,
  Toolbar,
  Button,
} from "@mui/material";
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';
import Image from 'next/image';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
//import AddDeliveryDetails from "../deliverydetails/add-delivery-details";
import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";

const PanelShow = ({ panel }) => {
  //const shareUrl = `https://bolt-news-app.herokuapp.com/fullscreen/${id}`;

  const [deliveryDetailId, setDeliveryDetailId] = useState('');
  const [buyername, setBuyername] = useState('');
  const [email, setEmail] = useState('');
  const [contactnumber, setContactnumber] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState();
  const [city, setCity] = useState('');

  const handleClick = async(event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/api/deliverydetails/`);
      console.log(res)
      setDeliveryDetailId(res.data.id);
      console.log(deliveryDetailId)
      //Router.push('/orders');
    } catch (error) {
      console.error('deliveryDetails Add Failed:', error);
    }
  }

  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      panelId: panel.id,
      //deliveryDetailId: deliveryDetailId
    },
    onSuccess: (order) => Router.push('/deliverydetails/add-delivery-details')
    //onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
  });

  const shareUrl = `https://rsswitchgear.com/panel/${panel.id}`;

  const description = panel?.description;
  const desc1 = description?.slice(0, 400);
  const desc2 = description?.slice(401);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Backdrop
  //         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //         open={isLoading}
  //       >
  //         <CircularProgress color="inherit" />
  //       </Backdrop>
  //     </div>
  //   );
  // }

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
                {panel?.title}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid container>
                <Grid item xs={0.5} sm={0.5} md={1} lg={1}></Grid>
                <Grid item xs={11} sm={11} md={10} lg={10}>
                  <Image 
                    src={panel?.img} 
                    alt="image"
                    layout="responsive"
                    width={500}
                    height={180}
                  />
                </Grid>
                <Grid item xs={0.5} sm={0.5} md={1} lg={1}></Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ pl: "3px", pr: "3px", m: 2 }}
            >
              <Typography
                variant="h5"
                sx={{ textAlign: "justify", overflow: "auto", textIndent: 0 }}
              >
                {desc1}
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={handleVolume}
              >
                <ReactPlayer
                  sx={{ borderRadius: 5 }}
                  url={
                    panel.videos === undefined
                      ? "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                      : panel.videos
                  }
                  muted={volume}
                  loop={true}
                  playing
                />
              </Box>
            </Grid> */}
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ pl: "3px", pr: "3px", m: 2 }}
            >
              <Typography
                variant="h5"
                sx={{ overflow: "auto", textIndent: 0, textAlign: "justify" }}
              >
                {desc2}
              </Typography>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 2 }}>
                <Typography component="h1" variant="h5">
                    Add DeliveryDetails
                </Typography>

                <Box component="form"  noValidate sx={{ mt: 1 }} >
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
                        id="address"
                        label="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)} 
                        name="complete address"
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
                        id="state"
                        label="state"
                        value={state}
                        onChange={e => setState(e.target.value)} 
                        name="state"
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
                    
                    {errors}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleClick()}
                    >
                        save details
                    </Button>
                </Box>
            </Grid> */}
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 2 }}>
              <Box
                component="div"
                sx={{ display: "flex", justifyContent: "center" }}
              >   
                  <Button variant="contained" sx={{ display: "flex", justifyContent: "center" }} onClick={() => doRequest()}>Order</Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box
                component="div"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FacebookShareButton
                  url={shareUrl}
                  quote={panel?.title}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={shareUrl}
                  title={panel?.title}
                  className="Demo__some-network__share-button"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={shareUrl}
                  title={panel?.title}
                  separator=":: "
                  className="Demo__some-network__share-button"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={1} md={1} lg={2}></Grid>
      </Grid>
    </>
  );
};

PanelShow.getInitialProps = async (context, client) => {
  const { panelId } = context.query;
  const { data } = await client.get(`/api/panels/${panelId}`);

  return { panel: data };
}

export default PanelShow;