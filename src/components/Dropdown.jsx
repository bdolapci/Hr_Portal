import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useEffect } from "react";

function Dropdown(props) {
  const [getJobInfo, setGetJobInfo] = React.useState("");

  function handleChange() {
    console.log("handle change");
  }

  

  

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-autowitdth-label">Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="asd"
          label="Categories"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default Dropdown;
