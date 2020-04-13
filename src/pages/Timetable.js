import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Timetable() {
  const url = "https://customerrest.herokuapp.com/gettrainings";

  const [state, setState] = useState([
    {
      start: "",
      end: "",
      title: "",
      resources: "",
    },
  ]);

  useEffect(() => {
    getData();
  }, []);
  console.log( state);
  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        return setState(
          responseData.map((data) => ({
            start: new Date(moment(data.date)),
            end: new Date(moment(data.date).add(data.duration, "minutes")),
            title: data.activity,
            resources: data.customer.firstname + " " + data.customer.lastname,
          }))
        );
      });
  };

  const localizer = momentLocalizer(moment);

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={state}
        style={{ height: "100vh" }}
      />
    </div>
  );
}
