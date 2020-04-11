import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function AddTraining(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    activity: "",
    date: new Date().toISOString(),
    duration: ""
  });

  const addTraining = () => {
    props.saveTraining(training);
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Button
        style={{ margin: 10 }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        ADD TRAINING
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add traning</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="activity"
            label="Activity"
            value={training.activity}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              defaultValue={
                <Moment format="YYYY/MM/DD">{training.date}</Moment>
              }
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <TextField
            margin="dense"
            name="duration"
            label="Duration"
            value={training.duration}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="Customer"
            label="customer"
            value={training.customer}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
