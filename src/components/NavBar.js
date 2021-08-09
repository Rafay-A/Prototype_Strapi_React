import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { Link } from 'react-router-dom';
import { useCurrentUser,useDispatchCurrentUser } from './CurrentUser';
import { callApi } from '../services/utils';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    marginLeft: 10,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const currentUser = useCurrentUser();
  const dispatch = useDispatchCurrentUser();
  
  const handleLogout = async () => {
    await callApi("/logout", "POST");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <>
    <AppBar style={{ background: "#2E3B55" }} position='static'>
      <Toolbar>
        <LocalMallIcon />
          <Typography variant='h6' className={classes.title}>
            <Link to='/product' className={classes.link}>
              Products
            </Link>
          </Typography>
        {/* <Link style={{ 'paddingLeft': '50px' }} to='/profile' className={classes.link}>
            Profile
        </Link> */}
        <Link style={{ 'paddingLeft': '50px' }} to='/' className={classes.link}>
            Home
        </Link>
        {!currentUser.isAuthenticated && (
        <Link style={{ 'paddingLeft': '50px' }} to='/login' className={classes.link}>
            Log in
        </Link>
        )}
        {currentUser.isAuthenticated && (
        <Link style={{ 'paddingLeft': '50px' }} onClick={handleLogout} className={classes.link}>
            Log out
        </Link>
        )}
      </Toolbar>
    </AppBar>
    </>
  );
};

export default NavBar;
