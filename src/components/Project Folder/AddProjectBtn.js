import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AddProject, getProjectsData, getProjectID } from "../../services/firebase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//Handles creating new Project in modal window.

function AddProjectBtn() {
  const [show, setShow] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);
  let [Name, setName] = useState("");
  let [Description, setDescription] = useState("");
  let [ProjectID, setProjectID] = useState("")
  // let [ProjectID, setProjectID] = useState(0);
  let [Status, setStatus] = useState("Open");
  let [Priority, setPriority] = useState("Low");
  

  let newProject = {
    Name: Name,
    Description: Description,
    ProjectID: ProjectID,
    Status: Status,
    Priority: Priority,
  };
  
  const handleInputFields = (event) => {
    if (event.target.name === "Name") {
      setName(event.target.value);
    } else if (event.target.name === "Description") {
      setDescription(event.target.value);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault(); //stop page from reloading
    
    // setTimeout(function () {
      await AddProject(newProject);
    // }, 700);

    
    // setTimeout(function () {
     await getProjectsData();
    // }, 1000);
    
    setTimeout(function () {
      window.location.reload(true);
      alert('Project Added');
    }, 2000);
   await setProjectID(getProjectID(newProject.Name));
  };

  const handlePriority = (event) => {
    setPriority(event.target.value);
    
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);

  }


  return (
    <>
      <Button onClick={handleModalShow} variant="contained">
        New Project
      </Button>

      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              onChange={handleInputFields}
              required
              id="filled-basic"
              name="Name"
              label="Name"
              variant="filled"
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={Priority}
                label="Priority"
                onChange={handlePriority}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Urgent"}>Urgent</MenuItem>
              </Select>
              <FormHelperText>Choose priority level</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
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
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
              <FormHelperText>Choose Status Level</FormHelperText>
            </FormControl>
            <TextField
              required
              name="Description"
              onChange={handleInputFields}
              id="filled-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="filled"
            />
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Create new project
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProjectBtn;
