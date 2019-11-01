import React from "react";
import Auth from "../modules/Auth";

const Dashboard = props => {
  console.log(props);
  const isLoggedIn = Auth.isLoggedIn().toString();
  return (
    <div>
      <div>
        <h1>Dashboard</h1>

        <h2>Status: {isLoggedIn}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
