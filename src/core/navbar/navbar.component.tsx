import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
    return <>
        <div className="navbar-header">
            <Navbar
                // bg="primary"
                style={{ backgroundColor: "#0F477E" }}
                variant="light"
            >
                <Container>
                    <Navbar.Brand as={NavLink} to="/dashboard">
                        <div>Task Manager</div>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link
                            as={NavLink}
                            to="/task-manager"
                        >
                            <div className="nav-item">
                                <div className="">Taskmanager</div>
                            </div>
                        </Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
        </div>
    </>
}

export default NavbarComponent;