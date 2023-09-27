import React from "react";
import {Outlet} from "react-router-dom";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";

import { Context } from "./Context";

const Layout = () => {

    const [State, setState] = React.useState({
        CurrentAlert: {
            open: false,
            vertical: 'top',
            horizontal: 'center',
            type: '',
            content : ''
        },
        CurrentProduct: {
            id: '',
            description: '',
            price: '',
            title: ''
        }
	}); 

 return (
 <>
 <AppBar />
 <Context.Provider value={{ State, setState }}>
        {console.log(State)}
        <Outlet />
 </Context.Provider>
 <Footer />
 </>
 );
};

export default Layout;