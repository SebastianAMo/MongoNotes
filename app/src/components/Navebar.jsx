import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navebar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="">MongoNotes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Move the "Home" and "Link" NavLinks to the right */}
          </Nav>
          <Nav className="ml-auto"> {/* Add ml-auto class here */}
            <Nav.Link href="#home"> <Link to={"login"}>Login</Link></Nav.Link>
            <Nav.Link href="#link"><Link to={"register"}>Register</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navebar;
