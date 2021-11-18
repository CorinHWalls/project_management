import React, { useState, useEffect} from "react";
import Button from "@mui/material/Button";
import { getTaskID, updateTaskData, getTasks} from "../../services/firebase";
import { Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditIcon from "../../assets/edit_icon.png"


function EditTasks(props) {
    const [show, setShow] = useState(false);
    const handleModalClose = () => setShow(false);
    const handleModalShow = () => setShow(true);
    let [Name, setName] = useState(props.Name);
    let [Description, setDescription] = useState(props.Description);
    let [Status, setStatus] = useState(props.Status);
    let [Priority, setPriority] = useState(props.Priority)
    let [newTaskID, setNewTaskID] = useState("");
    let currentTask = Name;

    let updates = {
        Name: Name,
        Description: Description,
        Status: Status,
        Priority: Priority,
        TaskID: newTaskID
      };
      
    // useEffect( async () => {
    //   await getTasks(newTaskID);
    // }, [updates])

      const handleInputChanges = (event) => {
        if (event.target.name === "Name") {
          setName(event.target.value);
        } else if (event.target.name === "Description") {
          setDescription(event.target.value);
        }
      };
    
      const handleStatus = (event) => {
        setStatus(event.target.value);
      };
    
      const handleSave = async (event) => {
        console.log(newTaskID)
        await updateTaskData(updates, newTaskID);
       
      };

      const handleEditClick = async (clickedProject) => {
     
        setNewTaskID(await getTaskID(props.Name));
        let taskID = await getTaskID(props.Name);
        props.setTaskID(taskID);
        console.log(taskID);
        handleModalShow();
      };

      
    

    return (
        <>
       
        <input title="Edit Task" onClick={handleEditClick} type="image" src={EditIcon} />
  
        <Modal show={show} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {currentTask}</Modal.Title>
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
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={Status}
                  label="Status"
                  onChange={handleStatus}
                >
                  <MenuItem value={"Backlog"}>Backlog</MenuItem>
                  <MenuItem value={"In Progress"}>In Progress</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
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
                multiline
                value={Description}
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
    )
}

export default EditTasks
