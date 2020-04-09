import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Snackbar from "@material-ui/core/Snackbar";
import AddCustomer from "./AddCustomer";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining"


export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
//fetch data from the customers API
  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((responseData) => {
        setCustomers(responseData.content);
        // console.log(responseData.content);
      });
  };

  //Delete customer works
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

  // add and save customer works
  const saveCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((_) => fetchData())
      .catch((err) => console.log(err))
      .then((_) => {
        setMsg("Customer added");
        setOpen(true);
      });
  };

  //add and save customer - still editing
  const saveTraining = (training) => {
    fetch ("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((_) => fetchData())
      .catch((err) => console.log(err))
      .then((_) => {
        setMsg("Taining is saved");
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  // edit customer - works
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


  const columns = [
    {
      accessor: "links[0]",
      sortable: false,
      filterable: false,
      minWidth: 30,

      Cell: (row) => (
        <DeleteCustomer
          deleteCustomerHandler={() => deleteCustomerHandler(row.value)}
        />
      ),
    },
    {
      sortable: false,
      filterable: false,
      minWidth: 30,

      Cell: (row) => (
        <EditCustomer
          updateCustomerHandler={updateCustomerHandler}
          customer={row.original}
        />
      ),
    },
    {sortable: false,
      filterable: false,
      minWidth: 100,

      Cell: (row) => (
        <AddTraining
          saveTraining= {saveTraining}
          customer={row.original}
        />
      ),
    },
    { Header: "First Name", accessor: "firstname" },
    { Header: "Last Name", accessor: "lastname" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone", type: "numeric" },
    { Header: "Adress", accessor: "streetaddress" },
    { Header: "Postcode", accessor: "postcode" },
    { Header: "City", accessor: "city" },
  ];

  return (
    <div>
      <AddCustomer saveCustomer={saveCustomer} />
      <ReactTable
        filterable={true}
        defaultPageSize={10}
        data={customers}
        columns={columns}
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


