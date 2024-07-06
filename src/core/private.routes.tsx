import { FC, ReactNode, useEffect, useState } from "react";
import { getLoginStatus } from "./auth.service";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode;
}

const PrivateRoute: FC<Props> = ({
    children,
}) => {
    const [loginChecked, setLoginChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
             
            const isLoggedIn: boolean = await getLoginStatus();

            setIsLoggedIn(isLoggedIn);
            setLoginChecked(true);
        }

        checkLogin();
    }, []);
    return <>
        {
            loginChecked && <>
                {isLoggedIn ? <>
                    {children}
                </> : (
                    <Navigate to={"/login"} />
                )}
            </>
        }
    </>
}

export default PrivateRoute;