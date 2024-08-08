import React, { useContext, useState } from "react";
import "./Login.scss";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import MuiAlert from "@mui/material/Alert";
import { Context } from "../..";
import backEndUrl from "../../host";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Login() {
  const [state, setState] = useState({
    open: true,
    Transition: Fade,
  });

  const [error, setError] = useState(false);
  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios
        .post(
          `${backEndUrl}`,
          { email, password },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.message === "matched") {
            console.log(res.data);
            history("/");
            setIsAuthenticated(true);
          } else if (res.data === "not exists") {
            setIsAuthenticated(false);
            alert("REgister first");
            history("/signup");
          } else if (res.data === "wrong password") {
            setIsAuthenticated(false);
            alert("Wrong password!");
          }
          setLoading(false);
        });
    } catch (e) {
      console.log('h');
      setIsAuthenticated(false);
      setLoading(false);
      console.log(e);
    }
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="maindivlogin">
        <div className="secondmaindiv">
          <pre>
            <div className="logintitle w3-animate-zoom">
              Login To <span>Newsify</span>
            </div>
          </pre>
          <div className="login w3-animate-zoom">
            <div className="name">
              <i
                className="fa-solid fa-envelope fa-2xl"
                style={{ color: "#af695c" }}
              ></i>
              <input
                className="w3-hover-shadow w3-border w3-border-black"
                type="text"
                placeholder="Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="name">
              <i
                className="fa-solid fa-unlock-keyhole fa-2xl"
                style={{ color: "#af695c" }}
              ></i>
              <input
                className="w3-hover-shadow w3-border w3-border-black"
                type="password"
                placeholder="Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              className="w3-button w3-btn w3-animate-zoom"
              disabled={loading}
              onClick={handleSubmit}
            >
              Login
            </button>
            OR
            <div className="loginicons ">
              <button className="w3-button w3-btn w3-animate-zoom">
                <i className="fa-brands fa-google"></i>
              </button>
              <button className="w3-button w3-btn w3-animate-zoom">
                <i className="fa-brands fa-twitter"></i>
              </button>
              <button className="w3-button w3-btn w3-animate-zoom">
                <i className="fa-brands fa-facebook-f"></i>
              </button>
            </div>
          </div>{" "}
          <div className="newuser w3-animate-zoom">
            New To Newsify??
            <Link to="/signup">
              <button className="btn btn-light nav-sec-link">Register</button>
            </Link>
          </div>
        </div>
      </div>
      {error && (
        <>
          <Snackbar
            open={state.open}
            onClose={handleClose}
            TransitionComponent={state.Transition}
            key={state.Transition.name}
          >
            <Alert severity="error">Wrong Credential!!!</Alert>
          </Snackbar>
        </>
      )}
    </>
  );
}
