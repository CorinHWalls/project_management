import React from "react";
import Tasks from "../Task Folder/Tasks";

function StatusLine(props) {

  //helpers which will be used to getTasks list then filter for tasks by status
  let taskList, tasksForStatus;

  if (props.tasks) {
    tasksForStatus = props.tasks.filter((task) => {
      return task.Status == props.status;
    });
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Tasks
          isLoaded={props.isLoaded}
          key={task.id}
          tasks={task}
          setTaskID={props.setTaskID}
          Name={props.tasks.Name}
          Description={props.tasks.Description}
          Status={props.status}
          isLoaded={props.isLoaded}
          setTaskID={props.setTaskID}
        />
      );
    });
  }

  return (
    <div className="statusLine">
      <h1>{props.status}</h1>
      {taskList}
    </div>
  );
}

export default StatusLine;
