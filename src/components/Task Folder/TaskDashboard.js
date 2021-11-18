import React from "react";
import { useState, useEffect } from "react";
import { getTasks, loadTasksData } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import StatusLine from "./StatusLine";
import { Col, Row, Toast, Button, Container } from "react-bootstrap";

function TaskDashboard(props) {
  let data = loadTasksData();
  let [tasks, setTasks] = useState(data);
  let [isLoaded, setIsLoaded] = useState(false);
  let navigate = useNavigate();

  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(true);
  const [position, setPosition] = useState('top-start');

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  // 1. get data from local storage
  let localID = localStorage.getItem('projectID');
  let projectName = localStorage.getItem('projDisplayName')
 

  // /Handling changes / updates to the page
  useEffect(async () => {
    
    // 2. check to see if exist or empty/null
    if(localID === null){
      await getTasks(props.ProjectID);
      setIsLoaded(true);
      // 3. else save props.ProjectID to local storage then use props.ProjectID to load tasks
      localStorage.setItem('projectID', props.ProjectID);
    }
     else {
       // 4. if there is anything use local storage varName to get task
       console.log('loading from local storage')
       await getTasks(localID);
       setIsLoaded(true);
    }

    if(projectName === null){
      localStorage.setItem('projDisplayName', props.projDisplayName)
    } 
    else{
      props.setProjDisplayName(projectName);
    }
    
  }, [tasks]);

  
 const handleHome = (e) =>{

  //removing localstorage so correct name saves/loads
  localStorage.removeItem('projectID');
  localStorage.removeItem('projDisplayName');
   navigate('/')

 }


  return (
    <>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand">Task Dashboard: {props.projDisplayName} </a>
        </div>
      </nav>
  
    <Row>
      <Col className="d-flex justify-content-start px-5 pt-2">
            <Button onClick={handleHome}>Home</Button>
      </Col>
    </Row>
        
      <Container className="pt-5">
        <Row>
          <Col className="pt-2">
            <StatusLine
              status="Backlog"
              tasks={tasks}
              Name={tasks.Name}
              Description={tasks.Description}
              Status={tasks.Status}
              isLoaded={isLoaded}
              setNewTaskID={props.setNewTaskID}
              setTaskID={props.setTaskID}
            />
          </Col>

          <Col className="pt-2">
            <StatusLine
              status="In Progress"
              tasks={tasks}
              isLoaded={isLoaded}
              Name={tasks.Name}
              Description={tasks.Description}
              Status={tasks.Status}
              isLoaded={isLoaded}
              setNewTaskID={props.setNewTaskID}
              setTaskID={props.setTaskID}
            />
          </Col>

          <Col className="pt-2">
            <StatusLine
              status="Completed"
              tasks={tasks}
              isLoaded={isLoaded}
              setNewTaskID={props.setNewTaskID}
              Name={tasks.Name}
              Description={tasks.Description}
              Status={tasks.Status}
              isLoaded={isLoaded}
              setTaskID={props.setTaskID}
            />
          </Col>
        </Row>

      </Container>

    </>
  );
}

export default TaskDashboard;
