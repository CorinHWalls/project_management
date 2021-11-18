import React from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function StatusFilter() {
    return (
        <div>
            <FormControl sx={{ m: 2, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={Status}
                label="Status"
                onChange={handleStatus}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={"Open"}>Open</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Closed"}>Completed</MenuItem>
              </Select>
              <FormHelperText>Filter by Status</FormHelperText>
            </FormControl>
        </div>
    )
}

export default StatusFilter
