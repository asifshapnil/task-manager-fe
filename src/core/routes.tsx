import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./private.routes";
import TaskManagerComponent from "../modules/task-manager/task-manager.component";
import SignInComponent from "./auth/signin.coponent";
import WithNav from "./with-nav";
import WithoutNav from "./without-nav";

const TaskManagerRoutes = () => {
    return <>
        <Routes>
            <Route element={<WithoutNav />}>
                <Route path="/login" element={<SignInComponent />} />
            </Route>

            <Route element={<WithNav />}>
                <Route path="/" element={<Navigate to="/task-manager" />} />
                <Route
                    path="task-manager"
                    element={
                        <PrivateRoute>
                            <TaskManagerComponent />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Routes>
    </>
}

export default TaskManagerRoutes;