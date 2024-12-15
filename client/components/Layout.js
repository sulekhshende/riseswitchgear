import React from 'react'
import Header from './header/Header';
import Footer from './footer/Footer';

const Layout = ({children, currentUser}) => {
  return (
    <>
        <Header currentuser={currentUser} />
        {children}
        <Footer/>
    </>
  )
}

export default Layout;