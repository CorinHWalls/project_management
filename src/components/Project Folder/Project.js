import React, { useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import AddTaskBtn from "../Task Folder/AddTaskBtn";
import { useNavigate} from 'react-router-dom';
import { getProjectID, DeleteProject } from "../../services/firebase";
import {Col, Row} from "react-bootstrap";
import TrashIcon from "../../assets/trash_icon.png"
import ViewIcon from "../../assets/view_details.png"

import { Modal } from "react-bootstrap";

import EditProject from "./EditProject";


function Project(props) {
  
  const navigate = useNavigate();
  const [newID, setNewID] = useState("");
  const [show, setShow] = useState(false);
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);
  let selectedProject = "";
  

  //used to display all projects or the search can be used to filter
  let filteredResults = props.projects.filter(filter => {
    
    return filter.Name.toLowerCase().includes(props.searchWord);
  })

//used to capture projectID by project name then navigate to taskDashboard
  const  handleView= async (event) => {
   setNewID(await getProjectID(event.target.name));
   let newProjID = await getProjectID(event.target.name);
   props.setNewProjectID(newProjID);
   props.setProjDisplayName(event.target.name);

    navigate('/TaskDashboard');

  }

  const handleDelete = async (event) => {
    setNewID(await getProjectID(event.target.name)); 
   
    selectedProject = event.target.name;
    console.log(selectedProject);
    handleModalShow();
  }

  const confirmedDelete =  () => {
   DeleteProject(newID);
  }

  //for each obj in the project array
  return filteredResults.map((item, index) => {
    

    return (

      //this section will create the layout of the card and place it on the Dashboard

<>
      {/* Conditional Rendering based on if 1 is showing or more */}
        {filteredResults.length != 1 ?
        // If more than 1 is displaying
          <Col md={4} className="pt-4">
            <Card key={index} variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Row>
                    <Col>
                  <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    {props.isLoaded ? item.Name : ""}
                  </Typography>
                  
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Priority: {props.isLoaded ? item.Priority : ""}
                  </Typography>
                  <Typography variant="body2">
                    
                    {/* Passing item.Name as prop so tie ID to Name*/}
                    <EditProject 
                    Name={item.Name} 
                    Description={item.Description}
                    Priority={item.Priority}
                    Status={item.Status}
                    setNewProjectID={props.setNewProjectID} 
                   
                    />
                       
                    <input title="Delete Project" onClick={handleDelete} type="image" name={item.Name} src={TrashIcon} />
                  
                    <br />
                  </Typography>
                  </Col>
                  

                  <Col lg="1">
                  <div className="line d-flex justify-content-center"></div>
                  </Col>

                  <Col>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Task Options
                  </Typography>
                  <Row>
                    <Col className="pt-3">
                    <input title="View Tasks" name={item.Name} onClick={handleView} type="image" label="View Tasks"  src={ViewIcon} />
                    <AddTaskBtn Name={item.Name} />
                    </Col>
                   
                  </Row>
                  </Col>

                  </Row>
                </CardContent>
          
              </React.Fragment>
            </Card>
          </Col>
          
          ///Else if there is only 1 displying do this:
          : <Col md={12} className="pt-2">
              <Card key={index} variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Row>
                    <Col>
                  <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    {props.isLoaded ? item.Name : ""}
                  </Typography>
                  
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Priority: {props.isLoaded ? item.Priority : ""}
                  </Typography>
                  <Typography variant="body2">
                    
                    {/* Passing item.Name as prop so tie ID to Name*/}
                    <EditProject Name={item.Name} setNewProjectID={props.setNewProjectID} />
                       
                    <input onClick={handleDelete} type="image" name={item.Name} src={TrashIcon} />
                  
                    <br />
                  </Typography>
                  </Col>
                  

                  <Col lg="1" >
                  <div className="line d-flex justify-content-center"></div>
                  </Col>

                  <Col>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Task Options
                  </Typography>
                  <Row>
                    <Col className="pt-3">
                    <input name={item.Name} onClick={handleView} type="image" label="View Tasks"  src={ViewIcon} />
                    <AddTaskBtn Name={item.Name} />
                    </Col>
                   
                  </Row>
                  </Col>

                  </Row>
                </CardContent>
          
              </React.Fragment>
            </Card>
          </Col>
          
          }
        <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete  the project? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmedDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
          
      </>
    )
})
}

export default Project
