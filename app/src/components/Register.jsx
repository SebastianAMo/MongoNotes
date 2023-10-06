import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

const Register = () => {
  const [validated, setValidated] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required('Campo obligatorio'),
    cc: yup.number().required('Campo obligatorio'),
    telefono: yup.number().required('Campo obligatorio'),
    direccion: yup.string().required('Campo obligatorio'),
    ocupacion: yup.string().required('Campo obligatorio'),
    usuario: yup.string().required('Campo obligatorio'),
    password: yup.string().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      cc: '',
      telefono: '',
      direccion: '',
      ocupacion: '',
      usuario: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/registration', // Ajusta la URL de registro según tu API
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
        <h2 className="text-center mb-4">Registro</h2>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          {/* Nombre */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Nombre
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.name && formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Cédula */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Cédula
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                name="cc"
                value={formik.values.cc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.cc && formik.errors.cc}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.cc}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Teléfono */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Teléfono
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="tel"
                name="telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.telefono && formik.errors.telefono}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.telefono}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Dirección */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Dirección
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.direccion && formik.errors.direccion}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.direccion}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Ocupación */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Ocupación
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="ocupacion"
                value={formik.values.ocupacion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.ocupacion && formik.errors.ocupacion}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.ocupacion}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Usuario */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Usuario
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="usuario"
                value={formik.values.usuario}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.usuario && formik.errors.usuario}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.usuario}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Contraseña */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Contraseña
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 8, offset: 4 }}>
              <Button variant="dark" type="submit">
                Registrarse
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
