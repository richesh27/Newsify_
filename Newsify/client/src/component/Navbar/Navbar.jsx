import React, { useContext, useEffect, useState } from "react";
import "../Navbar/navbar.css";
import { Link, useLocation } from "react-router-dom";
import Weather from "../../pages/HomePage/Weather";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { Context } from "../..";
import axios from "axios";
import useGeoLocation from "../../pages/Hooks/useGeoLocation";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import backEndUrl from "../../host";
import Fab from '@mui/material/Fab';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

const options = ['IPL', 'Virat Kohli', 'abc', 'medha', 'politics', 'trump', 'war', 'world', 'local', 'modi'];
const Navbar = () => {
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState('');
  const [region, setRegion] = React.useState('');
  const handleChange = (event) => {
    setRegion(event.target.value);
  };
  const geolocation = useGeoLocation();
  const pathClasses = [
    { path: '/', class: 'nav-link link' },
    { path: '/team', class: 'nav-link link' },
    { path: '/savedarticle', class: 'nav-link link' },
  ];

  const location = useLocation().pathname;
  if (location === '/') {
    pathClasses[0].class += ' current';
  }
  else if (location === '/team') {
    pathClasses[1].class += ' current';
  }
  else if (location === '/savedarticle') {
    pathClasses[2].class += ' current';
  }

  const { isAuthenticated, setIsAuthenticated, setUser,loading, setLoading } =
    useContext(Context);
  useEffect(() => {
    axios.get(`${backEndUrl}/users`, {
      withCredentials: true,
    }).then(res => {
      setUser(res.data.user);
      if (res.data.success === true) {
        setIsAuthenticated(true);
      }
      else {
        setUser({})
        setIsAuthenticated(false);
      }
    }).catch((e) => {
      console.log(e);
      setIsAuthenticated(false);
    })
  },[])
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/logout`, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
    } catch (e) {
      console.log(e);
      setIsAuthenticated(true);
    }
  };

  const [weatherda, setWeatherda] = useState([]);
  const [show, setShow] = useState(false);
  const [weather, showWeather] = useState(false);
  const [search, setSearch] = useState("");


  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = async () => {
    setOpen(!open);

    var latitude = geolocation.coordinates.lat;
    var longitude = geolocation.coordinates.lng;
    console.log("hello i am here");
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=dca87896300d471684a114613231004&q=${latitude},${longitude}&aqi=no`
    );
    const data = await res.json();
    setWeatherda(data);
    showWeather(true);
  };

  return (
    <div class="total">
      <nav class="navbar navbar-expand-lg navbar-light bg-light mainNav">
        <div class="container-fluid navbar">
          <p class="navbar-brand title">Newsify</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShow(!show)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div class="navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/" className={pathClasses[0].class}>
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/team" className={pathClasses[1].class}>
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/savednews" className={pathClasses[2].class}>
                  Saved Articles
                </Link>
              </li>
              <li class="nav-item">
                {isAuthenticated ? (
                  <button onClick={logoutHandler} className="nav-link link">
                    Logout
                  </button>
                ) : (
                  <Link to={"/login"} className="nav-link link">
                    Login
                  </Link>
                )}
              </li>
            </ul><Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Region</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={region}
                  label="region"
                  onChange={handleChange}
                >
                  <Link to="/regionnews/world"><MenuItem value={"World"}>World</MenuItem></Link>
                  <Link to="/regionnews/nation"><MenuItem value={"Nation"}>Nation</MenuItem></Link>
                  <Link to="/regionnews/local"><MenuItem value={"Local"}>Local</MenuItem></Link>
                </Select>
              </FormControl>
            </Box>
            <form class="d-flex searchBar" autoComplete="off">
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Search" />}
              />
              <Link to={`/search/${value}`} className="searchbtn"><button class="btn btn-outline-success search-btn" type="submit">
                Search
              </button></Link>
            </form>
            <Button onClick={handleToggle}>
              <i
                class="fa-solid fa-cloud-moon-rain fa-2xl"   // it's the weather button
                style={{ color: "#af695c" }}
              ></i>
            </Button>

            <a href="https://medha-tripathi.github.io/stock/" target="_blank">

              <i
                className="fa-brands fa-bitcoin fa-2xl mt-2"           //it's the stock market button
                style={{ color: "#af695c" }}
              ></i>
            </a>

            <Link to="https://www.espncricinfo.com/live-cricket-score"><Box sx={{ '& > :not(style)': { m: 1 } }}><Fab variant="extended" color="black" aria-label="add">
              <SportsCricketIcon sx={{ mr: 1 }} />
            </Fab></Box></Link>

            <Backdrop
              sx={{
                color: "white",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={open}
              onClick={handleClose}
            >
              {weather && <Weather weatherda={weatherda} />}
            </Backdrop>
          </div>

        </div>
      </nav>

      {/* <Cricket/> */}
    </div>
  );
};

export default Navbar;