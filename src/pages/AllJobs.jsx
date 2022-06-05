import React from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Button, Link, TablePagination, TextField } from "@mui/material";
import { Box } from "@mui/material";
import OneJobHR from "../components/OneJobHR";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import "../styles/SideBar.scss";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Unauthorized from "../components/Unauthorized";
import Jobinfocard from "../components/Jobinfocard";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Card, CardContent, Typography } from "@mui/material";

function AllJobs() {
  const [job, setJob] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [getJobInfo, setGetJobInfo] = React.useState("");
  function categoryHandler(e) {
    setCategory(e.target.value);
  }

  let Navigate = useNavigate();
  let a = [];
  let b = [];
  const deneme = async () => {
    //get all jobs
    try {
      const res = await axios.get("https://localhost:44361/api/Home/Jobs");
      for (var i = 0; i < res.data.length; i++) {
        a.push(res.data[i]);
      }
      a.reverse();

      for (var i = 0; i < a.length; i++) {
        b.push(a[i]);
      }

      setJob(b);
      console.log(a);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    deneme();
  }, []);

  //console.log(job[1].Name)

  const gridstyle = {
    display: "grid",
    gridTemplateColumns: "400px 400px",
    gridRow: " auto auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    justifyContent: "center",
    marginTop: "6%",
    marginBottom: "10%",
  };
  // const job2 ={"Name":["deneme","deneme2"],}
  console.log(job);

  const [query, setQuery] = React.useState("");

  // const category = async () => {
  //   try {
  //     const res = await axios.get("https://localhost:44361/api/Home/Jobs");
  //     for (var i = 0; i < res.data.length; i++) {
  //       a.push(res.data[i].category);
  //     }

  //     setGetJobInfo(a);
  //     console.log(a);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   category();
  // }, []);

  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", marginTop: "5%", fontSize: "64px" }}>
        Categories
      </h1>
      <input type="text"></input>
      <br />
      <Box sx={{ width: "100%", marginBottom: "2%", marginTop: "0" }}>
        <Typography>Chose the Category</Typography>
        <FormControl sx={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ color: "black" }}
            value={category}
            label="Category"
            required
            onChange={categoryHandler}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Software"}>Software</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br />
      <div style={gridstyle} className="grid">
        {job.map((value, index) => {
          return (
            //dropdown
            <>
              <Jobinfocard
                Name={value.Name}
                photo={value.photo}
                description={value.description}
                id={value.Id}
              />
            </>
          );
        })}
      </div>
    </>
  );
}

export default AllJobs;
