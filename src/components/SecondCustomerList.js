import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchDate();
  }, []);

  const fetchDate = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((responseData) => {
        setCustomers(responseData.content);
        console.log(responseData.content);
      });
  };

  const columns = [
    { title: "First Name", field: "firstname" },
    { title: "Last Name", field: "lastname" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone", type: "numeric" },
    { title: "Adress", field: "streetaddress" },
    { title: "Postcode", field: "postcode", type: "numeric" },
    { title: "City", field: "city" },
  ];

  

  return (
    <MaterialTable
      title="Customers"
      options={{
        search: true,
      }}
      columns={columns}
      data={customers}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setCustomers((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setCustomers((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setCustomers((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
