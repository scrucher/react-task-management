import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/core/Menu/Menu';
import { Button } from 'react-bootstrap';
import { Backdrop, Grid, InputBase, Modal, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/core/Icon/Icon';
import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import TaskApi from '../api/task';




const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: "500px",
      margin: "25%"
    },
    txtInpu: {
      width: "100%",
      borderRadius: "5px",

    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    createButton: {
      background: "#6495ed",
      color: " #ffffff",
      font: '20px',
      padding: "10px 20px",
      borderRadius: "5px",
      margin: "10px 0px",
      cursor: "pointer",
    },
    deleteButton: {
      background: "#ff0000",
      color: "#ffffff",
      font: '20px',
      padding: "10px 20px",
      borderRadius: "5px",
      margin: "10px 0px",
      cursor: "pointer",
    },
  }),
);

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    createButton: {
      background: "#1919FF",
      color: "#ffffff",
      font: '20px',
      padding: "10px 20px",
      borderRadius: "5px",
      margin: "10px 0px",
      cursor: "pointer",
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

export default function NavBar() {
  const classes = useStyles();
  const style = useStyle();
  const [ttl, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [show, setshow] = useState(false);
  const validateForm = () => {
    return ttl.length > 0;
  }
  const submitForm = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const title = ttl;
    const description = des;
    const res = () => {
      const resp = TaskApi.creatTask({ title, description });
      //return resp;
      console.log(resp);

    }
    //return res;
    console.log(res)
  }
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon open={false} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button variant="contained" color="info" className={classes.createButton} onClick={handleShow} >

            Create Task
          </Button>
        </Toolbar>
      </AppBar>



      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={style.modal}
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={show}>
          <div className={style.paper}>
            <form onSubmit={submitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="title"
                    name="title"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    label="Title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="flname"
                    onChange={(e) => setDes(e.target.value)}
                  />
                </Grid>
                <br />
                <Button variant="outline-danger" className={style.deleteButton} onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="outline-info" type="submit" disabled={!validateForm} className={style.createButton} onClick={handleClose} >
                  Update
                </Button>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>


    </div>
  );
}
