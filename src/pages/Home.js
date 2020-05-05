import React from "react";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${require("../image/pic.jpg")} )`,
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
        filter: 'green'
      }}
    >
      <h1
        style={{
          fontSize: 50,
          textAlign: "center",
          padding: 100,
          color: "#943126 ",
        }}
      >
        Welcome to Fitness World
      </h1>
    </div>
  );
}
