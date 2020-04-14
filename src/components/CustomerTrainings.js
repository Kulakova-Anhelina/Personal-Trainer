import React, { useState, useEffect } from "react";

export default function CustomerTrainings(props) {
  const [trainings, setTrainings] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(props.link)
      .then((response) => response.json())
      .then((responseData) => {
        setTrainings(
          responseData.content.map((training) => <li>{training.activity}</li>)
        );
        console.log(responseData.content[0].activity);
      });
  };

  return (
    <div>
      {trainings.length <= 0 ? (
        <p>No trainings for today</p>
      ) : (
        <ul>{trainings}</ul>
      )}
    </div>
  );
}
