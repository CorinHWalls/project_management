import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { loadTasksData, getTasks, AddTask, getProjectID } from "../../services/firebase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import addIcon from "../../assets/add_task.png"


function AddTaskBtn(props) {

    const [show, setShow] = useState(false);
    const handleModalClose = () => setShow(false);
    const handleModalShow = () => setShow(true);
    let [Name, setName] = useState("");
    let [Description, setDescription] = useState("");
    let [ProjectID, setProjectID] = useState("")
    let [Status, setStatus] = useState("Backlog");
    let [Priority, setPriority] = useState("Low")
    let [TaskID, setTaskID] = useState("");
    let newID;

    let newTask = {
      Name: Name,
      Description: Description,
      Status: Status,
      ProjectID: ProjectID,
      Priority: Priority,
      TaskID: TaskID
    };
    
    const handleInputFields = (event) => {
      if (event.target.name === "Name") {
        setName(event.target.value);
      } else if (event.target.name === "Description") {
        setDescription(event.target.value);
      }
    };
    
    const handleSubmit = async (event) => {
      // event.preventDefault();
      
      // setTimeout(function () {
        await AddTask(newTask);
      // }, 700);
  
      
      // setTimeout(function () {
        await loadTasksData();
      // }, 1000);
      
      setTimeout(function () {
        window.location.reload(true);
        alert('Task Added');
      }, 2000);
      // setTaskID(getTaskID(newTask.Name));
    };
    
    const handlePriority = (event) => {
      setPriority(event.target.value);
  
    }

    const addTaskBtn = async (event) => {
      console.log(props.Name);
      newID = await getProjectID(props.Name);
     setProjectID(newID);
      console.log(newID);
      handleModalShow();
    }

    return (
        <>
        <input title="Create a task" onClick={addTaskBtn} type="image" src={addIcon} />
        
        <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
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
            Create new Task
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        </>

        
    )
}

export default AddTaskBtn
