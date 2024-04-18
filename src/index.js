import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Pizza from "./pages/Pizza";
import Extra from "./pages/Extra";
import ListPizza from "./pages/ListPizza";
import ListExtra from "./pages/ListExtra";
import CreatePizza from "./pages/CreatePizza";
import CreateExtra from "./pages/CreateExtra";
import CheckOut from "./pages/CheckOut";
import OrderDetails from "./pages/OrderDetails";
import OrderSuccess from "./pages/OrderSuccess";
import UpdatePizza from "./components/UpdatePizza";
import UpdateExtra from "./components/UpdateExtra";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import * as React from 'react';
// start -> MUI with react-router
import PropTypes from 'prop-types';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
// end -> MUI with react-router
// export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/" {...props} role={undefined} />
  ));
  
function Router(props) {
const { children } = props;
if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
}

return <MemoryRouter>{children}</MemoryRouter>;
}

Router.propTypes = {
children: PropTypes.node,
};

export default function App() {

    // const [mode, setMode] = React.useState('light');
    // const colorMode = React.useMemo(
    //     () => ({
    //         toggleColorMode: () => {
    //         setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    //         },
    //     }),
    //     [],
    //     );
    
    let theme = React.useMemo(
        () =>
            createTheme({})
    );

    theme = responsiveFontSizes(theme);

 return (
    // <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="SignIn" element={<SignIn />} />
                        <Route path="SignUp" element={<SignUp />} />
                        <Route path="Pizza" element={<ListPizza />} />
                        <Route path="Extra" element={<ListExtra />} />
                        <Route path="Create Pizza" element={<CreatePizza />} />
                        <Route path="Create Extra" element={<CreateExtra />} />
                        <Route path="edit-pizza/:pk" element={<UpdatePizza />} />
                        <Route path="edit-extra/:pk" element={<UpdateExtra />} />
                        <Route path="pizza/pizza/:pk" element={<Pizza />} />
                        <Route path="extra/extra/:pk" element={<Extra />} />
                        <Route path="pizza/:pk" element={<Pizza />} />
                        <Route path="extra/:pk" element={<Extra />} />
                        <Route path="CheckOut" element={<CheckOut />} />
                        <Route path="OrderDetails" element={<OrderDetails />} />
                        <Route path="OrderSuccess" element={<OrderSuccess />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    // </ColorModeContext.Provider>
    
 );
}

ReactDOM.render(<App />, document.getElementById("root"));
