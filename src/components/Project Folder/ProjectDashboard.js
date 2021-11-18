import React, { useState, useEffect } from "react";
import { getProjectsData, getAllProjects } from '../../services/firebase';
import Project from "./Project";
import AddProjectBtn from "./AddProjectBtn";
import ProjectSearch from "./ProjectSearch";
import ProjectByPriority from "./ProjectByPriority";


import { Container, Row, Col} from "react-bootstrap";




function ProjectDashboard(props) {
   
    let [projects, setProjects] = useState(getAllProjects());
    let [isLoaded, setIsLoaded] = useState(false);
    const [searchWord, setSearchWord] = useState("");
   

    ///Handling changes / updates to the page
    useEffect( async () => {
        // setTimeout(function (){

         await  getProjectsData();
            

        // }, 100);

        // setTimeout(function (){
          await  setIsLoaded(true);
        // }, 500)

    }, [projects]);



    return (
        <>

<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand">Project Dashboard</a>
    <form class="d-flex">
    <ProjectSearch setSearchWord={setSearchWord} />
    </form>
  </div>
</nav>


        
       
      <div className="options">
          <Row className="d-flex justify-content-start pt-5">
              <Col md={3}>
              <AddProjectBtn />
              </Col>
              
              <Col md={3}>
              {/* <ProjectByStatus /> */}
              </Col>
          </Row>

          <Row className="pt-4">
          <Col md={3}>
              <ProjectByPriority setProjects ={setProjects} />
              </Col>
          </Row>

      </div>
        
      

      <Container className="d-flex justify-content-center pt-3">
        
        <Row> 

          <Project 
          projects={projects} 
          searchWord={searchWord}
          isLoaded={isLoaded}
          setNewProjectID={props.setNewProjectID}    
          setProjDisplayName={props.setProjDisplayName}
          />

        </Row>
        
    


      </Container>
      </>
      
    )
}

export default ProjectDashboard
