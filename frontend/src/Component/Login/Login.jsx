import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show,setShow] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = async(e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  const handlechange = () => {
    setShow(!show)
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax", color:"white" }}>
          Socials.
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="inputpassword">
        <input
          type={
            show ? "text" : "password"
          }
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {
          show ? ( <Visibility style={{
            position:"absolute",
            margin:"10px"
          }}
          onClick = {handlechange}
          />
          ) : (
            <VisibilityOff
            style={{
              position:"absolute",
              margin:"10px"
            }}
            onClick = {handlechange}
            />
          )
        }
       
        </div>
        

        <Link to="/forgot/password">
          <Typography style={{color:"white"}} >Forgot Password?</Typography>
        </Link>

        <Button style={{color:"white",backgroundColor:"var(--socials-secondary)",padding:".5rem 1rem"}} type="submit">Login</Button>

        <Link to="/register">
          <Typography style={{color:"white"}}>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;