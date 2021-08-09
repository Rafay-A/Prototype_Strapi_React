import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseLine from '@material-ui/core/CssBaseline';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useCurrentUser, useDispatchCurrentUser } from "./components/CurrentUser";
//import Detail from './components/Detail';
//import { CartProvider } from './contexts/CartContext';

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

const App = () => {
  return (
    <>
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
                  <h3 style={{'color':'#2E3B55'}} >Browse Our Products!</h3>
                </div>
                <hr/>
                <Product />
              </div>  
            </PrivateRoute>
            <Route path='/login'>
              <Login />
            </Route>
            {/* <Route path='/detail'>
              <Detail />
            </Route>  */}
            <Route path='/profile'>
              <Profile />
            </Route>
          </Switch>
        
      </Router>
    </>
  );
};

export default App;
