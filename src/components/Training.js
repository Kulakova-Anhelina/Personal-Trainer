import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Snackbar from "@material-ui/core/Snackbar";
import * as moment from "moment";
import DeleteTraining from "./DeleteTraining";

export default function Training() {
  const [training, setTraining] = useState([]);
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    fetchTraining();
    setReady(true);
  }, []);

  const fetchTraining = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((responseData) => {
        setTraining(responseData.content);
        console.log(responseData.content);
      });

    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((responseData) => {
        setTraining(responseData.content);
        console.log(responseData.content);
      });
  };

  const deleteTrainingsHandler = (link) => {
    console.log(link);
    fetch(link, { method: "DELETE" })
      .then((_) => fetchTraining())
      .then((_) => {
        setMsg("Training deleted");
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { Header: "Activity", accessor: "activity" },
    {
      Header: "Date",
      accessor: "date",
      Cell: (row) => (
        <span>{moment(row.value).format("MMMM Do YYYY, h:mm:ss a")}</span>
      ),
    },
    { Header: "Duration(min)", accessor: "duration" },
    {
      Header: "Customer",
      acessor: "customer",
      Cell: (row) => {
        return (
          <div>
            <span>{row.original.firstname} </span>
            <span>{row.original.lastname}</span>
          </div>
        );
      },
    },
    {
      acessor: "links[0].href",
      sortable: false,
      filterable: false,
      minWidth: 60,
      Cell: (row) => (
        <DeleteTraining
          deleteTrainingsHandler={() =>
            deleteTrainingsHandler(row.original.links[0].href)
          }
        />
      ),
    },
  ];

  if (!isReady) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <ReactTable
        filterable={true}
        defaultPageSize={10}
        data={training}
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
