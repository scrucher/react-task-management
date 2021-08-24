
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TaskApi from '../api/task';
import { TextField } from '@material-ui/core';


export function Login (){

    const [name, setusername] = useState('');
    const [passwd, setpassword] = useState('');
    const validateForm = () => {
        return name.length > 0 && passwd.length >0 ;
    }
    const SubmitForm = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const token = () => {
          const username = name;
          const password = passwd;
          const resp = TaskApi.loginUser({username, password});
          return resp;
          

        }
        return token();                                                                                                                                                                                                                                                                                                                   
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
    
    const classes = useStyles();
   
    return (
            <div>
              <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Sign in
                  </Typography>
                  <form className={classes.form} onSubmit={SubmitForm}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="username"
                    value={name}
                    autoComplete="username"
                    autoFocus
                    onChange={(e) => setusername(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={passwd}
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <div>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!validateForm()}
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </div>
          );
      

}