import { Container, Row, Col } from "react-bootstrap";
import "./preloader.css";

const Loader = () => {
  return (
    <Container fluid>
      <Row>
        <Col lg={3} xl={3}></Col>
        <Col lg={6} xl={6}>
          <Row>
            <div className="lds-ellipsis" style={{margin: "auto"}}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Row>
          <Row>
              <div style={{margin: "auto"}}>Данные загружаются. Пожалуйста, оставайтесь на странице.</div></Row>
        </Col>
        <Col lg={3} xl={3}></Col>
      </Row>
    </Container>
  );
};

export default Loader;
