import { useState } from "react";
import Router from 'next/router';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";   
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useRequest from '../../hooks/useRequest';
import Link from "next/link";

function Signin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  }

  const handleClick = () => {
    Router.push('/')
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
                  Sign In
              </Typography>

              <Box component="form"  noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
                  
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
                      value={password}
                      onChange={e => setPassword(e.target.value)} 
                      name="password"
                      label="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                  />
                  
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={() => handleClick}
                  >
                      Sign In
                  </Button>
                  {errors}
                  <Grid container>
                      <Grid item xs>
                        <Link href="/auth/signup/" passHref>
                            <Button 
                              sx={{ my:1, textDecoration: 'none' }}  
                            >
                                Don't Have an account? Sign Up
                            </Button>
                        </Link>
                      </Grid>
                  </Grid>
              </Box>
          </Box>
                             
      </Container>
  );
}
export default Signin;
