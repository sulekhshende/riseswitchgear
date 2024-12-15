import { Card, Container } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
//import { useRouter, } from 'next/navigation'
//import './ScrollCard.css'
//import Box from '@mui/material/Box/Box'
import { Box } from '@mui/material'
import Link from 'next/link';
//import Image from 'next/image';

const OrderIndex = ({ orders }) => {
    const styles = {
        card: {
            mb: 5,
            background: "#F5F5F5",
            borderRadius: 6,
            cursor: 'pointer'
        },
        grid1: {
            position: 'relative',
            maxHeight: 300
        },
        image: {
            borderRadius: 8,
            objectFit: "cover"
        },
        overlay: {
            position: 'absolute',
            bottom: 32,
            width: '87%',
            bgcolor: 'rgba(0, 0, 0, 0.54)',
            color: 'white',
            padding: '20px',
            textAlign: 'center',
            borderRadius: 2
        },
        title: {
            fontSize: '22px',
            padding: '10px'
        },
        titleMain: {
            fontSize: '28px',
            
        }
    }
  // const orderList = orders.map(order => {
  //   return(
  //     <tr key={order.id}>
  //       <td>{order.panel.title}</td>
  //       <td>{order.panel.price}</td>
  //       <td>{order.status}</td>
  //       <td>
  //         <Link href="/orders/[orderId]" as={`/orders/${order.id}`} >
  //           View
  //         </Link>
  //       </td>
  //     </tr>
  //   )
  // })

  // return (
  //   <div>
  //     <h1>My Order</h1>
  //     <table className="table">
  //       <thead>
  //         <tr>
  //           <th>Panel</th>
  //           <th>Price</th>
  //           <th>Status</th>
  //           <td>Link</td>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {orderList}
  //       </tbody>
  //     </table>
  //   </div>
  // );
   return(
    <>
      <Container maxWidth="xl" sx={{mt:0}} >
          <Container maxWidth="lg" sx={{ pt: 6 }}>
                {
                    orders && orders.length > 0 ? 
                    (
                        orders?.map((order) => (
                            <Link
                                href="/orders/[orderId]" as={`/orders/${order.id}`}
                                key={order.id}
                                //order={order}
                                style={{textDecoration: 'none'}}
                            >
                                <Card sx={styles.card} className="component" key={order.id}>
                                    <CardContent key={order.id}>
                                        <Grid container>
                                            <Grid item xs={12} sm={5} md={5} lg={5} sx={styles.grid1}>
                        
                                                <Box sx={{textDecoration:"none"}} >
                                                <CardMedia
                                                    component="img"
                                                    alt="image"
                                                    height="120"
                                                    width="80%"
                                                    //sx={{position: 'relative'}}
                                                    image={order.panel?.img}
                                                    //image={img}
                                                    sx={styles.image}  
                                                />

                                                </Box>
                                                <Box
                                                    sx={styles.overlay}
                                                >
                                                    <Typography variant="h5" sx={styles.title}>{order.panel.title}</Typography>
                                                </Box>
                                            </Grid>
                        
                                            <Grid item xs={12} sm={7} md={7} lg={7} sx={{ pl: 2 }}>
                                                <Typography variant='h6' className="titleMain" sx={styles.titleMain}>{order.panel.title}</Typography>
                                                <Typography><b>Price :</b>{order.panel.price}</Typography>
                                                <Typography><b>Status :</b>{order.status}</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    ) : 
                    (
                        <Container maxWidth="xl" sx={{mt:0}} >
                            <Container maxWidth="lg" sx={{ pt: 6 }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' }, color:"#2F2A45" }}
                            >
                                <b>Currently You don't have any orders!</b>
                            </Typography>
                            </Container>
                        </Container>    
                    )
                }
          </Container>
      </Container>
    </>
   )
}

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
}

export default OrderIndex;