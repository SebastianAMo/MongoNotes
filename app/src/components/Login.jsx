import React, { useState , useContext} from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../TokenContext';
import axios from 'axios';


function Login() {
  const [user, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setToken } = useContext(TokenContext);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user === '') {
      setEmailError('El campo de Usuario es obligatorio');
    }
    if (password === '') {
      setPasswordError('El campo de contraseña es obligatorio');
    }

    // Aquí puedes realizar la lógica de autenticación si todos los campos son válidos
    if (user !== '' && password !== '') {

      axios({
        method: 'POST',
        url: 'http://localhost:5000/token',
        data: {
          usuario: user,
          contraseña: password,
        },
      })
        .then((response) => {
          setToken(response.data);
          navigate('/main'); // Redirige al usuario a la página de perfil
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response) {

            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert('Datos errados');
          }
        });
    }
  };

  return (
    <Row className="justify-content-center mt-4">
      <Col md={7}>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu Usuario"
              value={user}
              onChange={handleEmailChange}
              isInvalid={emailError !== ''}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handlePasswordChange}
              isInvalid={passwordError !== ''}
            />
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="dark" type="submit" className="mt-2 me-2">
            Iniciar sesión
          </Button>
          <Button className="mr-2 mt-2" variant="dark" href="/">
            Regresar
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
