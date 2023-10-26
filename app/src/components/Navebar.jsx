import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import icono from "../assets/nav_icono.webp";
import { TokenContext } from '../TokenContext';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navebar() {
    const { token, setToken } = useContext(TokenContext);
    const navigate = useNavigate();

    const logout = async () => {
      const tokenString = JSON.stringify(token.access_token)|| "ds";

  
      const tokenWithoutQuotes = tokenString.replace(/"/g, '');

      try {
          // Asume que la URL de tu endpoint de logout es '/api/logout'
          const config = {
              headers: {
                  Authorization: "Bearer " + tokenWithoutQuotes,
              },
          };
          console.log(config);
          await axios.post('http://localhost:5000/logout', null, config);
          // Borra el token del estado
          setToken(null);
          // Redirige al usuario a la página de inicio o login
          navigate('/login');
      } catch (error) {
        setToken(null);
          console.error('Error during logout:', error);
          // Puedes mostrar un mensaje de error al usuario si es necesario
      }
  };

    return (
        <Navbar expand="lg" className="bg-body-tertiary mb-5" style={{ borderBottom: '3px solid #4B4B4B' }}>
            <Container>
                <Navbar.Brand href="">
                    <img src={icono} alt="Icono" className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                    {' '}
                    <Link to={""} className='text-black text-decoration-none'>MongoNotes</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {token ? (
                    <>
                        <Button variant="dark" onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/* Move the "Home" and "Link" NavLinks to the right */}
                            </Nav>
                            <Nav className="ml-auto">
                                <Button variant="dark" className='me-3'>
                                    <Link to={"login"} className='text-white text-decoration-none'>Login</Link>
                                </Button>

                                <Button variant="dark">
                                    <Link to={"register"} className='text-white text-decoration-none'>Register</Link>
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                )}
            </Container>
        </Navbar>
    );
}

export default Navebar;
