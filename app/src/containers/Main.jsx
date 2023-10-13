import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NoteForm from '../components/NoteForm'; // Asegúrate de usar la ruta correcta
import NoteComponent from '../components/Note'; // Asegúrate de usar la ruta correcta

const MainComponent = () => {
  // Estado para almacenar las notas, incluyendo dos notas de ejemplo
  const [notes, setNotes] = useState([
    { titulo: "Nota de ejemplo 1", fecha: "2023-10-13", nota: "Contenido de la nota de ejemplo 1." },
    { titulo: "Nota de ejemplo 2", fecha: "2023-10-13", nota: "Contenido de la nota de ejemplo 2." }
  ]);

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
        <Col sm={12} md={5}> {/* Ajusta esto para ocupar el espacio restante */}
          {notes.map((note, index) => (
            <NoteComponent key={index} note={note} />
          ))}
        </Col>
      </Row>
    </Container>
  );
  
};

export default MainComponent;
