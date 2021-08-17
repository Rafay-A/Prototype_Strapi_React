import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useCurrentUser, useDispatchCurrentUser } from "../components/CurrentUser";
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {callApi} from '../services/utils';

function Copyright() {
  return (
    <>
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        YOLO
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatchCurrentUser();
  const currentUser = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    if(currentUser.isAuthenticated) {
      history.push("/product")
    }
  }, [currentUser]);

  const submitForm = async (e) => {
    e.preventDefault();
    //history.push("/profile", { from: "login" })
    console.log("email", emailRef.current.value)
    console.log("password", passwordRef.current.value)
    
  try{
    const response = await callApi("/auth/local", "POST", {
        identifier: emailRef.current.value,
        password: passwordRef.current.value
      });

      console.log("response", response);

      if(!response.user){
        throw "Cannot login. Please try again."
      }
      dispatch({type:"LOGIN", user: response.users})
  }
  catch(err){
    setErrorMsg(err)
  }

  }

  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {errorMsg && <p>{errorMsg}</p>}
        <form onSubmit={submitForm} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            inputRef={emailRef}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            inputRef={passwordRef}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            //onClick={submitForm}
          >
            Log In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}

// import React from 'react';
// import { useState, useEffect, useRef } from 'react';
// import { useHistory } from 'react-router-dom';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         YOLO
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function Login() {
//   const classes = useStyles();
//   const [email,setEmail]=useState("");
//   const [password,setPassword]=useState("");
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     history.push("/profile", { from: "login" })
//     console.log("email", emailRef.current.value)
//     console.log("password", passwordRef.current.value)
//   }

//   return (
//     <main>
//       {/* {errorMsg && <p>{errorMsg}</p>} */}
//       <form class="measure center mt4" onSubmit={handleSubmit}>
//           <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//             <legend className="f4 fw6 ph0 mh0">Sign In</legend>
//             <div className="mt3">
//               <label className="db fw6 lh-copy f6" for="email-address">Email</label>
//               <input ref={emailRef} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
//             </div>
//             <div className="mv3">
//               <label className="db fw6 lh-copy f6" for="password">Password</label>
//               <input ref={passwordRef} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
//             </div>
//           </fieldset>
//           <div className="">
//             <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
//           </div>
//           <div className="lh-copy mt3">
//             <a href="#0" className="f6 link dim black db">Sign up</a>
//             <a href="#0" className="f6 link dim black db">Forgot your password?</a>
//           </div>
//         </form>
//     </main>
//   );
// }