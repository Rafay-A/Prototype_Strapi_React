import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseLine from '@material-ui/core/CssBaseline';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useCurrentUser } from "./components/CurrentUser";
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Order from './pages/Order';

//import Detail from './components/Detail';

function PrivateRoute({children, ...rest}){
  let currentUser = useCurrentUser();

  return(
    <Route
    {...rest}
    render={({location}) =>
    currentUser.isAuthenticated ? (
      children
    ) : (
      <Redirect
      to={{
        pathname: "/login",
        state: {from: location}
      }}
      />
    )
  }
  />
  );
}

//window.location.reload(false);

const App = () => {
  return (
    <>
    <CartProvider>
      <Router>
        <CssBaseLine />
          <NavBar />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <PrivateRoute path='/product'>
              <div className='product' style={{ 'justifyContent':'center'}}>
                <hr/>
                <div style={{ 'textAlign':'center'}}>
                  <h2 style={{'color':'#2E3B55'}}>Browse Our Products!</h2>
                </div>
                <hr/>
                <Product />
              </div>  
            </PrivateRoute>
            <Route path='/login'>
              <Login />
            </Route>
            <PrivateRoute path='/cart'>
              <Cart />
            </PrivateRoute>
            <Route path='/checkout'>
              <Checkout />
            </Route>
            <Route path='/orders/:code'>
              <Order />
            </Route>
            {/* <Route path='/detail'>
              <Detail />
            </Route>  */}
            <Route path='/profile'>
              <Profile />
            </Route>
          </Switch>
        <Footer/>
      </Router>
    </CartProvider>
    </>
  );
};

export default App;
