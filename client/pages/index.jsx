import React from 'react';
import { Container } from '@mui/material';
import ScrollCard from '../components/scrollcard/ScrollCard.jsx';


const LandingPage = ({ currentUser, panels }) => {

  return (
    <>
      <Container maxWidth="xl" sx={{mt:0}} >
          <Container maxWidth="lg" sx={{ pt: 6 }}>
              <ScrollCard panels={panels} key={panels.id}/>
              {/* {panels.map((panel) => {
                  return <ScrollCard panels={panel} key={panel.id} />
              })} */}

          </Container>
      </Container>    
    </>
  ) 
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/panels');

  return { panels: data };
}

export default LandingPage;

// LandingPage.getInitialProps = async ({ req }) => {
//   if (typeof window === 'undefined') {
//     // we are on the server!
//     // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk
//     const { data } = await axios.get(
//       'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
//       {
//         headers: req.headers,
//       }
//     );
 
//     return data;
//   } else {
//     // we are on the browser!
//     // requests can be made with a base url of ''
//     const { data } = await axios.get('/api/users/currentuser');
 
//     return data;
//   }
  //return {};
//};

// // LandingPage.getInitialProps = async (context) => {
// //     try {
// //       const client = buildClient(context)
// //       const {data} = await client.get('/api/users/currentuser');
// //       //console.log(data)
// //       if(data){
// //         return data;
// //       }
      
// //     } catch (err) {
// //       console.log('line 181 index ', err.message)
// //     }
// // }
