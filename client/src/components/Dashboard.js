import React from 'react';


const Dashboard = props => {
  if (props.loggedInStatus === "false"){

    props.history.push('/');
  }
  return (
    <div>
      <div>
        <h1></h1>

        <h2>Logged In: {props.loggedInStatus ? "Yes" : "No"}</h2>
      </div>
    </div>
  );
}

export default Dashboard;
