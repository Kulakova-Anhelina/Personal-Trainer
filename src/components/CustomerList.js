import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Snackbar from "@material-ui/core/Snackbar";
import AddCustomer from "./AddCustomer";
import DeleteCustomer from './DeleteCustomer';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((responseData) => {
        setCustomers(responseData.content);
        console.log(responseData.content);
      });
  };

  const deleteCustomerHandler = (link) => {
    fetch(link, { method: "DELETE" })
      .then((_) => fetchData())
      .then((_) => {
        setMsg("Customer deleted");
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const saveCustomer = (customers) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customers),
    })
      .then((response) => fetchData())
      .catch((err) => console.log(err))
      .then((response) => {
        setMsg("Customer added");
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { Header: "First Name", accessor: "firstname" },
    { Header: "Last Name", accessor: "lastname" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone", type: "numeric" },
    { Header: "Adress", accessor: "streetaddress" },
    { Header: "Postcode", accessor: "postcode" },
    { Header: "City", accessor: "city" },

    {
      accessor: "links[0].href",
      sortable: false,
      filterable: false,
      minWidth: 60,

      Cell: (row) => (
        <DeleteCustomer deleteCustomerHandler={() =>deleteCustomerHandler(row.value)} />
      ),
    },
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
