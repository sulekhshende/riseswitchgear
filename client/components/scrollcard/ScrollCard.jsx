import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { Box } from '@mui/material'
import Link from 'next/link'


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

const ScrollCard = ({panels}) => {
    
    //var information1 = description.slice(0, 200);
    //var information2 = description.slice(201,300);
    const [readmore, setReadmore] = useState(Array(panels.length).fill(false));
    const handleReadmore = (index) => {
        //setReadmore(!readmore);
        const newExpandedStates = [...readmore];
        newExpandedStates[index] = !newExpandedStates[index];
        setReadmore(newExpandedStates);
    }


    return (
        <>
            {panels?.map((panel, index) => (
                <Link
                    href="/panels/[panelId]" as={`/panels/${panel.id}`}
                    key={panel.id}
                    style={{textDecoration: 'none'}}
                >
                    <Card sx={styles.card} className="component" key={panel.id}>
                        <CardContent key={panel.id}>
                            <Grid container>
                                <Grid item xs={12} sm={5} md={5} lg={5} sx={styles.grid1}>
                                    <Box sx={{textDecoration:"none"}} >
                                    <CardMedia
                                        component="img"
                                        alt="image"
                                        height="270"
                                        width="80%"
                                        image={panel.img}
                                        sx={styles.image}  
                                    />
                                    </Box>
                                    <Box
                                        sx={styles.overlay}
                                    >
                                        <Typography variant="h5" sx={styles.title}>{panel.title}</Typography>
                                    </Box>
                                </Grid>
            
                                <Grid item xs={12} sm={7} md={7} lg={7} sx={{ pl: 2 }}>
                                    <Typography variant='h6' className="titleMain" sx={styles.titleMain}>{panel.title}</Typography>
                                    <Typography><b>Price :</b>{panel.price}</Typography>
            
                                    {/* {readmore ? <Typography>{panel.description.slice(0, 200)}</Typography> : <Typography>{panel.description.slice(201, 300)}</Typography>} */}
                                    <Typography>{readmore[index] ? panel.description : panel.description.slice(0, 200)}</Typography>
                                    <Button onClick={() => handleReadmore(index)}>
                                        {readmore[index] ? "Tap the image to read less" : "Read more..."}
                                        {/* {readmore ? "Tap the image to read more about this panel" : "Read more..."} */}
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </>
    )
}

export default ScrollCard;

