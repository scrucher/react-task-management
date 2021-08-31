import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, TextField, } from "@material-ui/core";
import TaskApi from "../api/task";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/dist/react-spring.cjs"; // web.cjs is required for IE 11 support
import { Button, Form } from "react-bootstrap";
import { TodoDto } from "../api/dto/task.dto";
import { CreatTaskModal } from "./taskModal.component";



export interface Props {
  onTaskCreated: (task: TodoDto) => void;
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    createButton: {
      background: "#6495ed",
      color: " #ffffff",
      font: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      margin: "10px 0px",
      cursor: "pointer"
    },
    deleteButton: {
      background: "#ff0000",
      color: "#ffffff",
      font: "20px",
      padding: "10px 20px",
      borderRadius: "5px",
      margin: "10px 0px",
      cursor: "pointer"
    }
  })
);



interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
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
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300,
    margin: 10
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  createButton: {
    background: "#6495ed",
    color: " #ffffff",
    font: "20px",
    padding: "10px 20px",
    borderRadius: "5px",
    margin: "10px 0px",
    cursor: "pointer"
  },
  deleteButton: {
    background: "#ff0000",
    color: "#ffffff",
    font: "20px",
    padding: "10px 20px",
    borderRadius: "5px",
    margin: "10px 0px",
    cursor: "pointer"
  },
  boxed: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

export default function TasksCard() {
  const classes = useStyles();
  const style = useStyle();
  const [show, setshow] = useState(false);
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);
  //const update = () => null;
  const [tasks, setTasks] = useState<TodoDto[]>([]);
  const addTask = (task: TodoDto) => {
    setTasks([...tasks, task]);
  };

  useEffect(() => {
    async function fetchAll() {
      const res = await TaskApi.getAll();
      setTasks(res);
    }
    fetchAll();
  }, []);

  return (
    <>
      <CreatTaskModal />

      <div className={classes.boxed} >

        {tasks.map(task => {
          return (
            <div>
              <Box
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
              >
                <Card className={classes.root} variant="outlined"
                  key={task.id}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {task.title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {task.body}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {task.status}
                    </Typography>

                    <Typography variant="body2" component="h6">
                      {task.priority}
                    </Typography>
                    <CardActions>
                      <Button
                        variant="contained"
                        className={classes.deleteButton}
                        color="danger"
                        onClick={handleClose}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.createButton}
                        color="info"
                        onClick={handleShow}
                      >
                        Update
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </Box>
            </div>
          );
        }
        )}


        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={style.modal}
          open={show}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={show}>
            <div className={style.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="title"
                    name="title"
                    variant="outlined"
                    required
                    fullWidth
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Form.Select aria-label="Default select example">
                    <option>Priority</option>
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </Form.Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Form.Select aria-label="Default select example">
                    <option>status</option>
                    <option value="1">To Do</option>
                    <option value="2">In Progress</option>
                    <option value="3">Done</option>
                  </Form.Select>
                </Grid>
                <br />
                <Button
                  variant="outline-danger"
                  className={classes.deleteButton}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline-info"
                  type="submit"
                  className={classes.createButton}
                  onClick={handleClose}
                >
                  Update
                </Button>
              </Grid>
            </div>
          </Fade>
        </Modal>

      </div>



    </>

  );
}
