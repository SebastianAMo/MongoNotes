import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import icono from "../assets/nav_icono.webp"

function Navebar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-5" style={{ borderBottom: '3px solid #4B4B4B' }}> {/* Estilo en línea para el color del borde */}
      <Container>
        <Navbar.Brand href="">
        <img  src={icono} alt="Icono" className="rounded-circle" style={{width: "50px", height: "50px"}} />
            {' '}
            <Link to={""} className='text-black text-decoration-none'>MongoNotes</Link>    
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Move the "Home" and "Link" NavLinks to the right */}
          </Nav>
          <Nav className="ml-auto"> {/* Add ml-auto class here */}
            <Button variant="dark" className='me-3'><Link to={"login"} className='text-white text-decoration-none'>Login</Link></Button>
            
            <Button variant="dark"><Link to={"register"} className='text-white text-decoration-none'>Register</Link></Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navebar;
