import React from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {getPriorityLow, getPriorityMed, getPriorityHigh, getPriorityUrgent, getAllProjects} from '../../services/firebase'

function ProjectByPriority(props) {

    const handlePriority = async (event) => {
        let data;
        switch (event.target.value) {
          case "Low":
            data = await getPriorityLow();
            
            break;
          case "Medium":
            data = await getPriorityMed();
            break;
          case "High":
            data = await getPriorityHigh();
            break;
          case "Urgent":
            data = await getPriorityUrgent();
            break;
    
          default:
            data = getAllProjects();
    
            break;
        }
    
       
         await props.setProjects(data);
     
      };
    return (
        <>
    
            <FormControl sx={{ minWidth: 130}}>
              <InputLabel id="demo-simple-select-helper-label">
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                // value={Priority}
                label="Priority"
                onChange={handlePriority}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Urgent"}>Urgent</MenuItem>
              </Select>
            </FormControl>
        </>
    )
}

export default ProjectByPriority
