import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import './navbar.scss';

const NavbarComponent = () => {
    return <>
        <div className="navbar-header">
            <Navbar
                bg="primary"
                style={{ backgroundColor: "#0F477E" }}
                variant="light"
            >
                <Container>
                    <Navbar.Brand as={NavLink} to="/task-manager">
                        <div>
                            <div className="">
                                <span style={{
                                    fontSize: '40px',
                                    fontFamily: 'monospace',
                                    fontWeight: '700',
                                    color: '#fff',
                                    letterSpacing: '5px'
                                }}>
                                    Task
                                </span>
                                <span style={{
                                    fontSize: '20px',
                                    fontFamily: 'sans-serif',
                                    fontWeight: '700',
                                    color: '#fff',
                                    marginLeft: '.5rem',
                                    letterSpacing: '5px'
                                }}>
                                    Manager
                                </span>
                            </div>
                        </div>
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

                    </Nav>
                </Container>
            </Navbar>
        </div>
    </>
}

export default NavbarComponent;