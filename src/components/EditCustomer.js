import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

export default function AddCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customers, setCustomers] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });

  const updateCustomerHandler = () => {
    props.updateCustomerHandler(customers, props.customers.links.customers.href);
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.customers)
    setCustomers({
        firstname: props.customers.firstname,
        lastname: props.customers.lastname,
        email: props.customers.email,
        phone: props.customers.phone,
        streetaddress: props.customers.streetaddress,
        postcode: props.customers.postcode,
        city: props.customers.city,
    })
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (event) => {
    setCustomers({ ...customers, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <IconButton
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
       <EditIcon/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            label="First Name"
            value={customers.firstname}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="lastname"
            label="Last Name"
            value={customers.lastname}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            value={customers.email}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            value={customers.phone}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="streetaddress"
            label="Street address"
            value={customers.streetaddress}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="postcode"
            label="Postcode"
            value={customers.postcode}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            value={customers.city}
            onChange={(e) => handleInputChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateCustomerHandler} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
