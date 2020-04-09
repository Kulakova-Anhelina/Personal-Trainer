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
import * as moment from "moment";

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
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((responseData) => {
        setTraining(responseData);
        console.log(responseData);
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


  const [state, setState] = useState({
    columns: [
      { title: "Activity", field: "activity" },
      {
        title: "Date",
        field: "date",
        render: (rowData) =>
          moment.utc(rowData.date).format("MMMM Do YYYY, h:mm:ss a"),
      },
      { title: "Duration", field: "duration" },
      {
        title: "Customer",
        field: "customer",
        render: (rowData) =>
          rowData.customer.firstname + " " + rowData.customer.lastname,
      },
    ],
    actions: [
      {
        icon: tableIcons.Delete,
        tooltip: "Delete Training",
        onClick: (event, rowData) => deleteTrainingsHandler(rowData),
      },
    ],
  });

  if (!isReady) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Trainings"
        options={{
          search: true,
          sorting: true,
        }}
        columns={state.columns}
        data={training}
        actions={state.actions}
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
