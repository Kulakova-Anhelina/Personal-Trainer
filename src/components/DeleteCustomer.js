import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
      <ReactTable
        filterable={true}
        defaultPageSize={10}
        data={customers}
        columns={columns}
      />
      />
    </div>
  );
}
