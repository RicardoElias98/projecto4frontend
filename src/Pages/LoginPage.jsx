import React from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/goBackInitialPage", { replace: true });
  };
  return (
    <div>
      <div className="overlay"></div>
      <div className="modal">
        <form>
          <div>
            <div className="labels-containers">
              <label htmlFor="username"> Username: </label>
              <input type="text" name="username" placeholder="Your username" />

              <label>
                <label htmlFor="Password"> Password: </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                />
              </label>
            </div>
          </div>
          <div className="button-container">
            <input className="button" type="submit" value="Send" />
            <button className="button" onClick={goBack}> Back </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
