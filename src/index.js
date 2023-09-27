import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Product from "./pages/Product";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
// start -> MUI with react-router
import PropTypes from 'prop-types';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
// end -> MUI with react-router
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

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
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
        );
    
    const theme = React.useMemo(
        () =>
            createTheme({
            root: {
                flexGrow: 1,
                },
            palette: {
                mode,
            },
            }),
        [mode],
        );
 return (
    <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="SignIn" element={<SignIn />} />
                        <Route path="SignUp" element={<SignUp />} />
                        <Route path="Create Product" element={<CreateProduct />} />
                        <Route path="edit-product/:id" element={<UpdateProduct />} />
                        <Route path="product/:id" element={<Product />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    </ColorModeContext.Provider>
    
 );
}

ReactDOM.render(<App />, document.getElementById("root"));
