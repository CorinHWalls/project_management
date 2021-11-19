import React, { useState, useEffect } from "react";
import { getProjectsData, getAllProjects } from "../../services/firebase";
import Project from "./Project";
import AddProjectBtn from "./AddProjectBtn";
import ProjectSearch from "./ProjectSearch";
import ProjectByPriority from "./ProjectByPriority";

import { Container, Row, Col } from "react-bootstrap";

function ProjectDashboard(props) {
  let [projects, setProjects] = useState(getAllProjects());
  let [isLoaded, setIsLoaded] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  ///Handling changes / updates to the page
  useEffect(async () => {
    await getProjectsData();

    await setIsLoaded(true);
  }, [projects]);

  return (
    <>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand">Project Dashboard</a>
          <form class="d-flex">
            
            <ProjectByPriority setProjects={setProjects} />
          </form>
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
            projDisplayName={props.projDisplayName}
          />
        </Row>
      </Container>
    </>
  );
}

export default ProjectDashboard;
