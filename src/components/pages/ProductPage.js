import React, { useEffect } from "react";
import { Container, Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import CartButton from "../cartButton";


const ProductPage = () => {
  const params = useParams();
  const product = useSelector((state) => state.products.items[params.id - 1]);

  useEffect(() => {
    
  }, [product])

  return (
      <Container>
      <Row className="mt-5">
        <Col lg={7} className="mt-5">
          <h1>{product.title}</h1>
          <h2>{product.category}</h2>
          <p>{product.description}</p>
        </Col>
        <Col lg={5} className="mt-auto">
          <Row>
            <Col className="d-block">
              <Image
                src={product.image}
                width="400px"
                className="d-block m-auto"
              />
              <div className="d-flex justify-content-center mt-3">
                <div className="w-50">
                <CartButton className="mx-5" item={product}/>
                </div>
                
                <h2 className="">{product.price}$</h2>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
