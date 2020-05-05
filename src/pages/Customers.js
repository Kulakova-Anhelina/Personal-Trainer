import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { forwardRef } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import EditCustomer from "../components/EditCustomer";
import AddTraining from "../components/AddTraining";
import CustomerTrainings from "../components/CustomerTrainings";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  //take customers from database
  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((responseData) => {
        setCustomers(responseData.content);
        //console.log(responseData.content);
      });
  };

  //Delete customer
  const deleteCustomerHandler = (link) => {
    fetch(link, { method: "DELETE" })
      .then((_) => fetchData())
      .then((_) => {
        setMsg("Customer deleted");
        setOpen(true);
      })
      .catch((err) => console.error(err));
    console.log(link);
  };

  //add customer
  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((_) => fetchData())
      .then((_) => {
        setMsg("Customer added");
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const saveCustomer = (customer) => {
    const newCustomer = {
      firstname: customer.firstname,
      lastname: customer.lastname,
      email: customer.email,
      phone: customer.phone,
      streetaddress: customer.streetaddress,
      postcode: customer.postcode,
      city: customer.city,
    };
    addCustomer(newCustomer);
  };

  //edit customer
  const updateCustomerHandler = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((_) => fetchData())
      .catch((err) => console.log(err))
      .then((_) => {
        setMsg("Customer was edited");
        setOpen(true);
      });
  };

  //add training

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((_) => fetchData())
      .then((_) => {
        setMsg("Training added");
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const saveTraining = (training) => {
    addTraining(training);
  };

  const [state, setState] = useState({
    detailPanel: [
      {
        tooltip: "Show trainings",
        render: (rowData) => <CustomerTrainings link={rowData.links[2].href} />,
      },
    ],

    columns: [
      {
        title: "Edit",
        field: "links[0].href",
        render: (rowData) => (
          <EditCustomer
            updateCustomer={updateCustomerHandler}
            customer={rowData}
          />
        ),
        sorting: false,
        editable: false
      },
      {
        title: "",
        field: "links[0].href",
        render: (rowData) => (
          <AddTraining
            saveTraining={saveTraining}
            customer={rowData.links[0].href}
          />
        
        ),
        sorting: false
       
      },

      { title: "First Name", field: "firstname" },
      { title: "Last Name", field: "lastname" },
      { title: "Email", field: "email" },
      { title: "Phone", field: "phone", type: "numeric" },
      { title: "Adress", field: "streetaddress" },
      { title: "Postcode", field: "postcode", type: "numeric" },
      { title: "City", field: "city" },
    ],
  });

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Customers"
        options={{
          search: true,
          sorting: true,
        }}
        columns={state.columns}
        detailPanel={state.detailPanel}
        data={customers}
        editable={{
          onRowDelete: (link) =>
            new Promise((resolve) => {
              deleteCustomerHandler(link.links[0].href);
              resolve();
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              saveCustomer(newData);
              resolve();
            }),
        }}
      />

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
      />
    </div>
  );
}
