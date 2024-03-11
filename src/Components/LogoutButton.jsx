import React from "react";

function LogoutButton() {
    const logout = (event) => {
        fetch("http://localhost:8080/project4backend/rest/user/login", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: 
      },
    }).then
        
    }
  return <button onClick={logout}> Logout </button>;
}

export default LogoutButton;
