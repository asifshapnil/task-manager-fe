import { FC, ReactNode } from "react";
import { isLoggedIn } from "./auth.service";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode;
}

const PrivateRoute: FC<Props> = ({
    children,
}) => {
    return <>
        {isLoggedIn() ? { children } : (
            <Navigate to={"/login"} />
        )}
    </>
}

export default PrivateRoute;