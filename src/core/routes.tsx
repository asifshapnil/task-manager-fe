import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./private.routes";
import TaskManagerComponent from "../modules/task-manager/task-manager.component";

const TaskManagerRoutes = () => {
    return <>
        <Routes>
            <Route path="/" element={<Navigate to="/task-manager" />} />
            <Route
            path="task-manager"
            element={
              <PrivateRoute>
                <TaskManagerComponent />
              </PrivateRoute>
            }
          />
        </Routes>
    </>
}

export default TaskManagerRoutes;