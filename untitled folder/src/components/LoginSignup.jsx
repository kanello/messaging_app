// if the user has no auth stored in the browser, then they get shown the sign in / sign up page
// take user input from their login/singup and check against db
// create-user and credentials-check routes
// if successful, show the user the App
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const init_credentials = { username: "", password: "" };

function Login_Signup() {
  const [credentials, setCredentials] = useState(init_credentials);
  const navigate = useNavigate();

  function changeCredentials(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  function checkUser() {
    axios
      .post("http://localhost:5000/credentials-check", credentials)
      // .then((res) => console.log(res.data))
      .then((res) => {
        if (res.data.success) {
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("id", res.data.id);
          navigate("/channel/0");
        } else {
          alert("Username and password combo incorrect");
        }
      }) //gets a server error but actually sends user to useful page
      .catch((error) => console.log(error));
  }

  function createUser() {
    axios
      .post("http://localhost:5000/create-user", credentials)
      // .then((res) => console.log(res.data))
      .then((res) => {
        if (res.data.success) {
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("id", res.data.id);
          navigate("/channel/0");
        } else {
          alert("Username is taken");
        }
      }) //gets a server error but actually sends user to useful page
      .catch((error) => console.log(error));
  }

  function clearForm(e) {
    e.preventDefault();
    setCredentials(init_credentials);
  }

  return (
    <div className="auth" id="auth">
      <div className="login">
        <h2>Welcome to Belay!</h2>
        <form onSubmit={clearForm}>
          <p>Enter a username</p>
          <input
            required
            name="username"
            type="text"
            id="username"
            placeholder="Enter username"
            value={credentials.username}
            onChange={changeCredentials}
          ></input>
          <input
            required
            name="password"
            type="password"
            id="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={changeCredentials}
          ></input>
          <button id="login" onClick={checkUser}>
            Log In
          </button>
          <button id="signup" onClick={createUser}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login_Signup;
