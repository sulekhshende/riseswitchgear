// import { useEffect } from 'react';
// import Router from 'next/router';
// import useRequest from '../../hooks/useRequest';

// const Signout = () => {
//   const { doRequest } = useRequest({
//     url: '/api/users/signout',
//     method: 'post',
//     body: {},
//     onSuccess: () => Router.push('/')
//   })

//   useEffect( async () => {
//     try{
//       await doRequest();
//     }catch(err){
//       console.log(err.message)
//     }
//   }, []);

//   return <div>Signing you out...</div>;
// }

// export default Signout;

import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const Signout = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    const signout = async () => {
      try {
        await doRequest();
        Router.push('/');
      } catch (err) {
        console.log(err.message);
        // Handle error here if needed
        // For example, you can display an error message to the user
        // and redirect them to the home page after some time
        Router.push('/');
      }
    };

    signout();

    // Clean up any resources if needed
    return () => {
      // Cleanup code here
    };
  }, [doRequest]);

  return <div>Signing you out...</div>;
};

export default Signout;