import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectDashboard from "./components/Project Folder/ProjectDashboard";
import TaskDashboard from "./components/Task Folder/TaskDashboard";
import {Route, Routes } from "react-router-dom";
import { getTasks } from "./services/firebase";



function App() {

  //Passing ProjectID and setNewProjectID to components that need access
  const [ProjectID, setNewProjectID] = useState("")
  const [tasks, setTasks] = useState(getTasks);
  const [TaskID, setTaskID] = useState("");
  const [projDisplayName, setProjDisplayName] = useState("")



  return (
    <>
    
        <Routes>
          <Route path="/" element={<ProjectDashboard 
          ProjectID={ProjectID} 
          setNewProjectID={setNewProjectID} 
          setProjDisplayName={setProjDisplayName}
          projDisplayName={projDisplayName}
          />} />

          <Route path="/TaskDashboard" element={<TaskDashboard 
          ProjectID={ProjectID} 
          setNewProjectID={setNewProjectID}  
          tasks={tasks} 
          TaskID={TaskID} 
          setTaskID={setTaskID} 
          projDisplayName={projDisplayName}
          setProjDisplayName={setProjDisplayName}
          
        />} />
        
        </Routes>

     
    </>
  );
}

export default App;
