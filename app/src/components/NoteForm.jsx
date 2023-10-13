import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

const NoteForm = () => {
  const [validated, setValidated] = useState(false);

  const schema = yup.object().shape({
    titulo: yup.string().required('Campo obligatorio'),
    nota: yup.string().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      titulo: '',
      fecha: new Date().toISOString().slice(0, 10), // Fecha actual en formato 'YYYY-MM-DD'
      nota: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/notes', // Ajusta la URL de registro según tu API
        data: values,
      })
        .then((response) => {
          console.log(response.data);
          // Realiza acciones adicionales después del registro exitoso
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formik.isValid) {
      setValidated(true);
      formik.submitForm();
    } else {
      setValidated(false);
    }
  };

  return (
    <Row className="justify-content-center mt-4">
      <Col md={7}>
        <h2 className="text-center mb-4">Crear Nota</h2>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          {/* Título */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Título
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="titulo"
                value={formik.values.titulo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.titulo && formik.errors.titulo}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.titulo}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Fecha de creación */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Fecha de Creación
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="fecha"
                value={formik.values.fecha}
                readOnly // Esto hace que el campo no sea editable
              />
            </Col>
          </Form.Group>

          {/* Nota */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Nota
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="textarea"
                name="nota"
                value={formik.values.nota}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.nota && formik.errors.nota}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.nota}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 8, offset: 4 }}>
              <Button variant="dark" type="submit">
                Guardar Nota
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default NoteForm;
