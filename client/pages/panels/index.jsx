import ScrollCard from '../../components/scrollcard/ScrollCard';

const ShowAllPanels = ({ panels }) => {
  return (
    <>
      <Container maxWidth="xl" sx={{mt:0}} >
          <Container maxWidth="lg" sx={{ pt: 6 }}>
              <ScrollCard panels={panels} key={panels.id}/>
          </Container>
      </Container>    
    </>
  ) 
};

ShowAllPanels.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/panels');

  return { panels: data };
}

export default ShowAllPanels;