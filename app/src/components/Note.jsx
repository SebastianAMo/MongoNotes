import React from 'react';
import Card from 'react-bootstrap/Card';

function Note({ note }) {
  return (
    <Card className="mt-3" style={{ backgroundColor: 'white', borderColor: 'darkgrey', borderWidth: '1px' }}>
      <Card.Body>
        <Card.Title>{note.titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{note.fecha}</Card.Subtitle>
        <Card.Text>
          {note.nota}
        </Card.Text>
        {/* Puedes añadir links o botones para acciones adicionales aquí */}
      </Card.Body>
    </Card>
  );
}

export default Note;
