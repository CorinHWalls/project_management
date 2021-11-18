import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditTasks from "./EditTasks";
import TrashIcon from "../../assets/trash_icon.png";
import {DeleteTask, getTaskID} from "../../services/firebase";
import { Col} from "react-bootstrap"

function Tasks(props) {



  const handleDelete = async (e) => {
    let taskID = await getTaskID(e.target.name);
    DeleteTask(taskID);
    
   
  }

  return (

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

  );
}

export default Tasks;
