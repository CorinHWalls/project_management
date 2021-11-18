// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS0BRlL86dCErKLH_kjrOXOIO_u1NMVXw",
  authDomain: "projecttracker-b6da2.firebaseapp.com",
  projectId: "projecttracker-b6da2",
  storageBucket: "projecttracker-b6da2.appspot.com",
  messagingSenderId: "1025209419539",
  appId: "1:1025209419539:web:46399984c613e33b663ce6",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

const timeStamp = new Date();

const projects = [];
//Priority
const lowProjects = [];
const medProjects = [];
const highProjects = [];
const urgentProjects = [];

//Status
const openProjects = [];
const closedProjects = [];

//Tasks
const tasks = [];
const backlogTasks = []
const inProgressTasks = []
const completedTasks = []
const sortedTasks = [];

///////////////////////////////////////////////////// PROJECTS //////////////////////////////////////////////////////////
async function AddProject(Projects) {
  try {
    const docRef = await addDoc(collection(db, "Projects"), {
      Name: Projects.Name,
      ProjectID: Projects.ProjectID,
      Status: Projects.Status,
      Priority: Projects.Priority,
      Description: Projects.Description,
      DateCreated: timeStamp,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Loads data into arrays
async function getProjectsData() {
  projects.length = 0; //so the data is not duplicated when this func is called
  lowProjects.length = 0;
  medProjects.length = 0;
  highProjects.length = 0;
  urgentProjects.length = 0;

  const querySnapshot = await getDocs(collection(db, "Projects"));
  querySnapshot.forEach((doc) => {
    if (doc.data().Priority === "Low") {
      lowProjects.push(doc.data());
    }

    if (doc.data().Priority === "Medium") {
      medProjects.push(doc.data());
    }

    if (doc.data().Priority === "High") {
      highProjects.push(doc.data());
    }

    if (doc.data().Priority === "Urgent") {
      urgentProjects.push(doc.data());
    }

    if (doc.data().Status === "Open") {
      openProjects.push(doc.data());
    }

    if (doc.data().Status === "Closed") {
      closedProjects.push(doc.data());
    }

    projects.push(doc.data());
  });
  return projects
}

//Gets the projectID based Projects.Name on the editProject component being clicked
async function getProjectID(clickedProject) {
  let projID = "";
  const querySnapshot = await getDocs(collection(db, "Projects"));
  querySnapshot.forEach((doc) => {
    if (clickedProject === doc.data().Name) {
      projID = doc.id;
    }
  });
  return projID;
}


//Updates Project on edit when save btn is used
async function updateProjectData(updates, projectID) {
  await updateDoc(doc(db, "Projects", projectID), {
    Name: updates.Name,
    Status: updates.Status,
    Description: updates.Description,
    Priority: updates.Priority,
    ProjectID: updates.ProjectID,
    // TaskID: updates.TaskID
  });
}
//call this function when you need to display the data
function getAllProjects() {
  return projects;
}

function getPriorityLow() {
  return lowProjects;
}
function getPriorityMed() {
  return medProjects;
}
function getPriorityHigh() {
  return highProjects;
}
function getPriorityUrgent() {
  return urgentProjects;
}

//Delete project 
async function DeleteProject(ProjectID) {
    await deleteDoc(doc(db, "Projects", ProjectID));
    // console.log(ProjectID); 
}

///////////////////////////////////////////////////// TASKS //////////////////////////////////////////////////////////
async function getTasks(projectID) {
  tasks.length = 0; //so the data is not duplicated when this func is called
  const querySnapshot = await getDocs(collection(db, "Tasks"));
  querySnapshot.forEach((doc) => {
    if(doc.data().ProjectID === projectID)
    tasks.push(doc.data());
    if(doc.data().Status === "BackLog" && doc.data().ProjectID === projectID){
      backlogTasks.push(doc.data());
    }
    if(doc.data().Status === "in Progress" && doc.data().ProjectID === projectID){
      inProgressTasks.push(doc.data());
    }
    if(doc.data().Status === "Completed" && doc.data().ProjectID === projectID){
      completedTasks.push(doc.data());
      console.log(completedTasks);
    }

  });
// return tasks;
}


async function AddTask(Tasks) {
  try {
    
    const docRef = await addDoc(collection(db, "Tasks"), {
      Name: Tasks.Name,
      ProjectID: Tasks.ProjectID,
      TaskID: Tasks.TaskID,
      Status: Tasks.Status,
      Priority: Tasks.Priority,
      Description: Tasks.Description,
      DateCreated: timeStamp,
      // DueDate: Tasks.DueDate,
      // AssignedTo: Tasks.AssignedTo,
      // Notes: Tasks.Notes
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//edit tasks 
async function updateTaskData(updates, TaskID) {
  await updateDoc(doc(db, "Tasks", TaskID), {
    Name: updates.Name,
    Status: updates.Status,
    Description: updates.Description,
    Priority: updates.Priority,
    TaskID: updates.TaskID
  });
}


async function DeleteTask(taskID) {
  // let taskID = await getTaskIDByTaskName(task.TaskName);
  await deleteDoc(doc(db, "Tasks", taskID));
}

function loadSortedTasks() {
  return sortedTasks;
}

async function getTaskID(clickedProject) {
  let taskID = "";
  const querySnapshot = await getDocs(collection(db, "Tasks"));
  querySnapshot.forEach((doc) => {
    if (clickedProject === doc.data().Name) {
      taskID = doc.id;
    }
  });
  return taskID;
}

///Displays all tasks
function loadTasksData() {
  return tasks;
}

export {
  getPriorityLow,
  getPriorityMed,
  getPriorityHigh,
  getPriorityUrgent,
  AddProject,
  AddTask,
  getProjectsData,
  getTasks,
  loadTasksData,
  getAllProjects,
  getProjectID,
  updateProjectData,
  updateTaskData,
  getTaskID,
  loadSortedTasks,
  DeleteProject,
  DeleteTask,
};
