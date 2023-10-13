import { Container, Row, Col } from 'react-bootstrap';
import home_about from "../assets/home.png";

function Body (){
  return (
    <Container className="mt-5 text-justify" id='about' >
      <Row>
        <Col md={6}>
          <h2>Acerca de mongonotes</h2>
          <p className='text-justify'>Mongo notes es un software para hacer notas que como base de datos tiene mongodb usando replicat set y sharding para sus alta disponibilidad y rendimiento, usa como backend fastApi y como front React</p>

        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-center">
        <img src={home_about} width={500}  alt="Imagen de about us" className="img-fluid align-items-center" />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;