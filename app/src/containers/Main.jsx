import React, { useState , useEffect, useContext } from 'react';
import { Container, Row, Col , Card, Button } from 'react-bootstrap';
import NoteForm from '../components/NoteForm'; // Asegúrate de usar la ruta correcta
import axios from 'axios';
import { TokenContext } from '../TokenContext';

const MainComponent = () => {
  const { token } = useContext(TokenContext);
  // Estado para almacenar las notas
  const [notes, setNotes] = useState([]);



    const refresh = async () => {
    const useridString = JSON.stringify(token.user_id) || "ds";
    const useridWithoutQuotes = useridString.replace(/"/g, '');
    const tokenString = JSON.stringify(token.access_token) || "ds";
    const tokenWithoutQuotes = tokenString.replace(/"/g, '');
    axios({
      method: "GET",
      url: `http://localhost:5000/get_notes/${useridWithoutQuotes}`,
      headers: {
        Authorization: "Bearer " + tokenWithoutQuotes,
      },
    }).then((response) => {
      setNotes(response.data.notas)  // Asegúrate de acceder a la propiedad 'notas' del objeto data

    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  };  // El array vacío como segundo argumento significa que este efecto se ejecutará una vez cuando el componente se monte.

  // Función para manejar el envío del formulario de la nota, añadiendo la nueva nota al estado
  const handleFormSubmit = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <Container className='ms-0'>
      <Row>
        {/* Columna para el formulario */}
        <Col sm={12} md={5}> {/* Ajusta esto para darle más espacio al formulario */}
          <NoteForm onFormSubmit={handleFormSubmit} />
        </Col>
        {/* Columna para las notas */}
        <Col sm={12} md={7}> 
        <Button variant="dark" className='mb-4' onClick={refresh}>Refresh</Button>
        {notes.map((note) => (
          <Col md={6} lg={4} key={note._id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{note.titulo}</Card.Title>
                <Card.Text>{note.nota}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        </Col>

      </Row>
    </Container>
  );
};

export default MainComponent;
