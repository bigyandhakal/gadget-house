import { Link } from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import {Button, Badge, Stack} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link to={"/"} className="text-decoration-none text-dark">
            Gadget House
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to={"/"} className="text-decoration-none text-dark">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={"/products"} className="text-decoration-none text-dark">
                Product
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={"/about"} className="text-decoration-none text-dark">
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={"/contact"} className="text-decoration-none text-dark">
                Contact
              </Link>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div className="p-1">
            <Stack gap={1} direction="horizontal">
              <Link to={"/cart"}>
                <a className="btn btn-outline-secondary">
                  <FaShoppingCart />
                  &nbsp;
                  <Badge bg="primary">0</Badge>
                </a>
              </Link>
              <Link to={"/login"}>
                <a className="btn btn-outline-secondary">
                  <BiLogIn size={24} />
                </a>
              </Link>
            </Stack>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;