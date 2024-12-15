//import 'bootstrap/dist/css/bootstrap.css'

import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return <div>
    <Header currentUser={currentUser}/>
    <div className="container">
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  </div>;
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if(appContext.Component.getInitialProps){
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }

  return { 
    pageProps, 
    currentUser: data.currentUser
  };
};

export default AppComponent;



// //import Layout from '../components/Layout'
// //import '../styles/globals.css';
// import buildClient from './api/build-client';

// import { CssBaseline } from "@mui/material"
// //import Layout from "./components/Layout"
// import Header from './components/header/Header';

// const MyAppComponent = ({ Component, pageProps, currentUser }) => {
//   return (
//     <>
//       <CssBaseline />
//       <Header currentUser={currentUser} />
      
//       {/* <div className="container"> */}
//         <Component currentUser={currentUser} {...pageProps} />
//       {/* </div> */}
//     </>
//   );
// };
 
// MyAppComponent.getInitialProps = async (appContext) => {
//   const client = buildClient(appContext.ctx);
//   const { data } = await client.get('/api/users/currentuser');
 
//   let pageProps = {};
//   if (appContext.Component.getInitialProps) {
//     pageProps = await appContext.Component.getInitialProps(appContext.ctx);
//   }
 
//   return {
//     pageProps,
//     ...data,
//   };
// };
 
// export default MyAppComponent;


// // const MyAppComponent = ({ Component, pageProps, currentuser }) => {
// //   return (
// //     <>
// //         <CssBaseline />
// //           <Header currentUser={currentuser}>
// //         {/* <Layout {...currentUser?.email}> */}
// //             <Component {...pageProps} />
// //           </Header>
// //         {/* </Layout> */}
// //     </>
// //   ) 
// // };

// // MyAppComponent.getInitialProps = async(appContext) => {
// //   try {
// //       const client = buildClient(appContext.ctx);
// //       const { data } = await client.get("/api/user/currentuser");
// //       let pageProps = {};

// //       if(appContext.Component.getInitialProps){
// //           pageProps = appContext.Component.getInitialProps(appContext.ctx);
// //       };

// //       console.log(pageProps);

// //       return {
// //         pageProps,
// //         ...data
// //       };
// //   } catch (err) {
// //       console.log(err.message)
// //   }
// // }

// // export default MyAppComponent;
