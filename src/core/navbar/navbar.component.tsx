import { faAdd, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import './navbar.scss';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationComponent from "../notification/notification.component";
import { getNotifications } from "../../store/notification.slice";
import TextLogo from "../common/textlogo.component";

const NavbarComponent = () => {
    const dispatch = useDispatch();

    const [isShowNotification, setIsShowNotification] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const notificationCount = useSelector((state: any) => state.notification.notificationCount);
    const notifications = useSelector((state: any) => state.notification.notifications);

    useEffect(() => {
        if (notifications.length) return;
        dispatch(getNotifications());
    }, [])

    const handleClickOutside = (event: any) => {
        if (
            notificationRef.current &&
            !notificationRef.current.contains(event.target as Node) &&
            !notificationRef.current.parentElement?.contains(event.target as Node)
        ) {
            setIsShowNotification(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return <>
        <div className="navbar-header">
            <Navbar
                bg="primary"
                style={{ backgroundColor: "#0F477E" }}
                variant="light"
            >
                <Container>
                    <Navbar.Brand as={NavLink} to="/task-manager">
                        <TextLogo />
                    </Navbar.Brand>
                    <Nav className="d-flex justif-content-end">
                        <Nav.Link
                            as={NavLink}
                            to="/task-manager"
                        >
                            <div className="nav-item">
                                <div className="">Task board</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="#"
                        >
                            <div className="notification-nav" onClick={() => setIsShowNotification(!isShowNotification)}>
                                <div className="nav-item">
                                    <div className="notificationcountwrapper">
                                        <FontAwesomeIcon icon={faBell} className="fs-7" />
                                        <div className="count">{notificationCount}</div>
                                    </div>
                                    {
                                        isShowNotification &&
                                        <div className="notification" ref={notificationRef}>
                                            <NotificationComponent />
                                        </div>
                                    }
                                </div>
                            </div>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    </>
}

export default NavbarComponent;