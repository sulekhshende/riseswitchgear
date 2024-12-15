// import Link from 'next/link';

// const Header = ({ currentUser }) => {
  // const links = [
  //   { label: 'Buy Panel', href: '/' },
  //   !currentUser && { label: 'Sign Up', href: '/auth/signup' },
  //   !currentUser && { label: 'Sign In', href: '/auth/signin' },
  //   currentUser && { label: 'My Panel', href: '/panels' },
  //   currentUser && { label: 'My Order', href: '/orders' },
  //   currentUser && { label: 'Sign Out', href: '/auth/signout' }
  // ]
  //   .filter(linkConfig => linkConfig)
  //   .map(({ label, href }) => {
  //     return <li key={href} className="nav-item">
  //       <Link href={href}>
  //         {label}
  //       </Link>
  //     </li>
  //   });

//   return <nav className="navbar navbar-light bg-light">
//     <Link href="/">
//       Panel
//     </Link>
//     <div className="d-flex justify-content-end">
//       <ul className="nav d-flex align-items-center">
//         {links}
//       </ul>
//     </div>
//   </nav>
// }

// export default Header;

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// //import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// //import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// //import{Link} from 'react-router-dom';
// import BoltIcon from '@mui/icons-material/Bolt';
// //import {Grid, InputLabel, FormControl, Select, SelectChangeEvent } from "@mui/material";
// //import HeaderSelectLocation from './HeaderSelectLocation';
// import { useState } from 'react';
// //import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
// import Link from 'next/link';
// import Router from 'next/router';

 
// const Header = ({currentUser}) => {
//   console.log(currentUser)
//   const links = [
//     { label: 'Buy Panel', href: '/' },
//     !currentUser && { label: 'Sign Up', href: '/auth/signup' },
//     !currentUser && { label: 'Sign In', href: '/auth/signin' },
//     currentUser && { label: 'My Panel', href: '/panels' },
//     currentUser && { label: 'My Orders', href: '/orders' },
//     currentUser && { label: 'Sign Out', href: '/auth/signout' }
//   ]
 
//   const loc = [
//   {key:1, category: 'panels'},
//   {key:2, category: 'MeterPanel'},
//   {key:3, category: 'DistributionBox'},
//   {key:4, category: 'APFC'},
//   {key:5, category: 'PCC'},
//   {key:6, category: 'MCC'},
//   {key:7, category: 'DG'},
//   {key:8, category: 'SignIn'},
//   {key:9, category: 'SignOut'}
//   ]
 
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   //const [ showLocationOption, setShowLocationOption] = useState(true)
 
//   //const [ color, setColor ] = useState("white")
 
//   //const navigate = useNavigate()
 
//   const url="https://cdn.pixabay.com/photo/2015/11/26/16/28/vintage-1064142_1280.png"
// ;
//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   // const handleOpenUserMenu = (event) => {
//   //   setAnchorElUser(event.currentTarget);
//   // };
 
//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//     //setShowLocationOption(false)
//   };
 
//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };
 
//   const handleClick = () => {
//     //setShowLocationOption(true)
//     //navigate('/')
//     Router.push('/')
//   }
 
 
//   //let id=2;
 
//   return (
//     <AppBar position="sticky" sx={{background:' #F5F5F5', }}>
//       <Container maxWidth="xl" sx={{color: '#2F2A45'}} >
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             // component="div"
//             sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color:"#2F2A45"}}
//             onClick={handleClick}
//           >
//             <b>Rise Switchgear &</b><BoltIcon fontSize="large"/> <b>Controls</b>
//           </Typography>
 
//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, float: 'right'}}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {
//                   currentUser ? 
//                     (
//                       <>
//                         <MenuItem onClick={handleCloseNavMenu}>
//                           <Link sx={{textDecoration: 'none'}} href="/orders/" passHref>
//                             <Typography sx={{ textAlign: 'center', color: '#050833' }}>Orders</Typography>
//                           </Link>
//                         </MenuItem>
//                         <MenuItem onClick={handleCloseNavMenu}>
//                           <Link sx={{textDecoration: 'none'}} href="/auth/signout" passHref>
//                             <Typography sx={{ textAlign: 'center', color: '#050833' }}>SignOut</Typography>
//                           </Link>
//                         </MenuItem>
//                       </>
//                     ) : 
//                     (
//                       <MenuItem onClick={handleCloseNavMenu}>
//                         <Link sx={{textDecoration: 'none'}} href='/auth/signin' passHref>
//                           <Typography sx={{ textAlign: 'center', color: '#050833' }}>SignIn</Typography>
//                         </Link>
//                       </MenuItem>
//                     )
//                 } 
//             </Menu>
//           </Box>
 
//           <Typography
//             variant="h6"
//             noWrap
//             // component="div"
//             onClick={handleClick}
//             sx={{flexGrow: 1, display: { xs: 'flex', md: 'none', color:'#2F2A45'} }}
//           >
//             <b>Rise Switchgear & Controls</b>
//           </Typography>
//           <Box sx={{  flexGrow: 1, display: { xs: 'none', md: 'flex' }, float: 'right' }}>
              
                
//               {
//                 currentUser ?
//                 (
//                   <>
//                     <Link style={{ textDecoration: 'none', color: '#050833' }} href="/orders/" passHref>
//                       <Button style={{ textDecoration: 'none', color: '#050833', width: '100%', height: '100%' }}>
//                         orders
//                       </Button>
//                     </Link>
//                     <Link style={{ textDecoration: 'none', color: '#050833', display: 'flex', float: 'right' }} href="/auth/signout/" passHref>
//                       <Button onClick={handleCloseNavMenu} style={{ textDecoration: 'none', color: '#050833', width: '100%', height: '100%' }}>
//                         signout
//                       </Button>
//                     </Link>
//                   </>
//                 ) :
//                 (
//                   <Link style={{ textDecoration: 'none', color: '#050833', display: 'flex', float: 'right' }} href="/auth/signin/" passHref>
//                     <Button onClick={handleCloseNavMenu} style={{ textDecoration: 'none', color: '#050833', width: '100%', height: '100%' }}>
//                       signin
//                     </Button>
//                   </Link>
//                 )
//               }
//               {/* {
//                   showLocationOption ? <HeaderSelectLocation/> : ""
//               } */}
             
             
//           </Box>
 
//           <Box sx={{ flexGrow: 0 }}>
//             {/* <Tooltip title="Click to Work">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" sx={{backgroundColor:"#2F2A45"}} >
//                 <WorkOutlineOutlinedIcon color="primary"/>
//                 </Avatar>
               
//               </IconButton>
//             </Tooltip> */}
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
                
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default Header;

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import Router from 'next/router';
import Tooltip from '@mui/material/Tooltip';
import BoltIcon from '@mui/icons-material/Bolt';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = ({currentUser}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    
      {
        currentUser ?
        (
          <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            <MenuItem>
              <Link style={{ textDecoration: 'none', color: '#050833' }} href="/orders/" passHref>
                <Button style={{ textDecoration: 'none', color: '#050833'}}>
                    orders
                </Button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link style={{ textDecoration: 'none', color: '#050833' }} href="/deliverydetails/" passHref>
                <Button style={{ textDecoration: 'none', color: '#050833'}}>
                    address
                </Button>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
              <Link style={{ textDecoration: 'none', color: '#050833' }} href="/auth/signout" passHref>
                <Button style={{ textDecoration: 'none', color: '#050833'}}>
                    SignOut
                </Button>
              </Link>
            </MenuItem>
          </Menu>
        ) : 
        (
          <MenuItem>
            <Link style={{ textDecoration: 'none', color: '#050833' }} href="/auth/signin" passHref>
              <Button style={{ textDecoration: 'none', color: '#050833'}}>
                  SignIn
              </Button>
            </Link>
          </MenuItem>
        )
      }
    </Menu>
  );

  const handleClick = () => {
    Router.push('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{background:' #F5F5F5'}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' }, color:"#2F2A45" }}
            onClick={handleClick}
          >
            <b>Rise Switchgear &</b><BoltIcon fontSize="large"/> <b>Controls</b>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {
                currentUser ? 
                (
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Link style={{ textDecoration: 'none', color: '#050833' }} href="/orders/" passHref>
                      <Button style={{ textDecoration: 'none', color: '#050833', }}>
                          orders
                      </Button>
                    </Link>
                    <Link style={{ textDecoration: 'none', color: '#050833' }} href="/deliverydetails/add-delivery-details" passHref>
                      <Button style={{ textDecoration: 'none', color: '#050833', }}>
                          address
                      </Button>
                    </Link>
                    <Link style={{ textDecoration: 'none', color: '#050833' }} href="/auth/signout" passHref>
                      <Button style={{ textDecoration: 'none', color: '#050833', }}>
                          signout
                      </Button>
                    </Link>
                  </Box>
                ) : 
                (
                  <Link style={{ textDecoration: 'none', color: '#050833' }} href="/auth/signin" passHref>
                    <Button style={{ textDecoration: 'none', color: '#050833', }}>
                        SignIn
                    </Button>
                  </Link>
                )
              }
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, color:"#2F2A45" }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;