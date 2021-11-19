import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditTasks from "./EditTasks";
import TrashIcon from "../../assets/trash_icon.png";
import ViewIcon from "../../assets/view_details.png"
import { DeleteTask, getTaskID } from "../../services/firebase";
import Button from "@mui/material/Button";
import { Col } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function Tasks(props) {
  const [modalChecker, setModalChecker] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);
  const [show, setShow] = useState(false);
  

  const handleDelete = async (event) => {
    
  
    setModalChecker(false);
    handleModalShow();
    
  };
  
  const confirmedDelete = async (event) => {
    let taskID = await getTaskID(event.target.name);
    DeleteTask(taskID);
    window.location.reload(true);
  }

  const handleDetails = () => {
    setModalChecker(true);
    handleModalShow();
  }

  return (
    <>
      <Col className="pt-3">
        <Card>
          <React.Fragment>
            <CardContent>
              <Typography id="name" variant="h5" component="div">
                {props.isLoaded ? props.tasks.Name : "Error"}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Status: {props.isLoaded ? props.tasks.Status : "Error"}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Priority: {props.isLoaded ? props.tasks.Priority : "Error"}
              </Typography>

              <Typography variant="body2">
                <EditTasks
                  setTaskID={props.setTaskID}
                  Name={props.tasks.Name}
                  Description={props.tasks.Description}
                  Status={props.tasks.Status}
                  Priority={props.tasks.Priority}
                />

                <input
                  title="View Info"
                  name={props.tasks.Name}
                  onClick={handleDetails}
                  type="image"
                  label="View Project"
                  src={ViewIcon}
                />

                <input
                  title="Delete Task"
                  onClick={handleDelete}
                  type="image"
                  name={props.tasks.Name}
                  src={TrashIcon}
                />

                <br />
              </Typography>
            </CardContent>
          </React.Fragment>
        </Card>
      </Col>

      { modalChecker != true ?
        <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Caution this cannot be undone </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmedDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      :<Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task: {props.tasks.Name}</Modal.Title>
        
      </Modal.Header>
      <Modal.Body>Status: {props.tasks.Status} | Priority: {props.tasks.Priority} </Modal.Body>
      
      <Modal.Body>Description: {props.tasks.Description} </Modal.Body>
    
      <Modal.Footer>
       
      </Modal.Footer>
    </Modal>
}
    </>
  );
}

export default Tasks;
