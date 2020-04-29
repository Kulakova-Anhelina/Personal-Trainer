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

  const deleteCustomer = (link) => {
    fetch(link, {
      method: "DELETE",
    })
      .then((_) => fetchData())
      .then((_) => {
        setMsg("Customer deleted");
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const addCustomer = (customer) => {
    console.log(customer);
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((_) => fetchData())
      .then((_) => {
        setMsg("New customer added");
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const updateCustomer = (link, customer) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((_) => fetchData())
      .then((_) => {
        setMsg("Customer information upadated");
        setOpen(true);
      })
      .catch((err) => console.error(err));
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
        title: "",
        editable: 'never',
        field: "links[0].href",
        render: (rowData) => (
          <AddTraining
            saveTraining={saveTraining}
            customer={rowData.links[0].href}
          />
        ),
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
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              const customer = {
                firstname: newData.firstname,
                lastname: newData.lastname,
                streetaddress: newData.streetaddress,
                postcode: newData.postcode,
                city: newData.city,
                email: newData.email,
                phone: newData.phone,
              };
              addCustomer(customer);
              handleClose();
              resolve();
            }),

          onRowUpdate: (newData) =>
            new Promise((resolve) => {
              const customer = {
                firstname: newData.firstname,
                lastname: newData.lastname,
                streetaddress: newData.streetaddress,
                postcode: newData.postcode,
                city: newData.city,
                email: newData.email,
                phone: newData.phone,
              };
              const link = newData.links[0].href;
              updateCustomer(link, customer);
              resolve();
            }),

          onRowDelete: (link) =>
            new Promise((resolve) => {
              deleteCustomer(link.links[0].href);
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
