import React, { useState } from "react";
import Button from "@mui/material/Button";
import { getProjectID, updateProjectData } from "../../services/firebase";
import { Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditIcon from "../../assets/edit_icon.png"

function EditProject(props) {

  let [newID, setNewID] = useState("");
  const [show, setShow] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);
  let [Name, setName] = useState(props.Name);
  let [Description, setDescription] = useState(props.Description);
  let [Status, setStatus] = useState(props.Status);
  let [Priority, setPriority] = useState(props.Priority);
  let [ProjectID, setProjectID] = useState("");

  let currentName = props.Name;

  let updates = {
    Name: Name,
    Description: Description,
    Status: Status,
    Priority: Priority,
    ProjectID: ProjectID,
  };
 


  const handleInputChanges = (event) => {
    if (event.target.name === "Name") {
      setName(event.target.value);
    } else if (event.target.name === "Description") {
      setDescription(event.target.value);
    }
  };
  const handlePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSave = (event) => {
    updateProjectData(updates, newID);
    setTimeout(function (){
      window.location.reload();

    }, 500)
  };

  const handleEditClick = async () => {
    //when edit button is clicked newID will be the ID of the project clicked
    setNewID(await getProjectID(props.Name));
    // setProjectID(newID);


    //Passing the Project ID to App.js to be used else where in project
   await props.setNewProjectID(newID);
     handleModalShow();
  };


  return (
    <>
    
      <input title="Edit Project" onClick={handleEditClick} type="image" src={EditIcon} />

      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {currentName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 2, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              onChange={handleInputChanges}
              required
              id="filled-basic"
              name="Name"
              label="Name"
              variant="filled"
              value={Name}
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
                {/* <MenuItem value=""></MenuItem> */}
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
                <MenuItem value={"Open"}>Open</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
              <FormHelperText>Choose Status Level</FormHelperText>
            </FormControl>
            
            <TextField
              required
              fullWidth
              name="Description"
              onChange={handleInputChanges}
              id="filled-multiline-static"
              label="Description"
              value={Description}
              multiline
              rows={4}
              variant="filled"
            />
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProject;
