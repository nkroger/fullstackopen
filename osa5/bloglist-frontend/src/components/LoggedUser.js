import React from "react";

const LoggedUser = ({ name, logoutHandler }) => (
  <>
    {name} logged in
    <button onClick={logoutHandler}>logout</button>
    <br />
  </>
);

export default LoggedUser;
