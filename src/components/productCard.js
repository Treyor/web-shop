import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { EDIT_PRODUCT_ROUTE, PRODUCT_ROUTE } from "./utils/consts";
import { deleteProduct } from "./actions/products";

const ProductCard = (props) => {
  const accountType = useSelector(
    (state) => state.auth.currentUser.accountType
  );
  const item = props.item;

  const dispatch = useDispatch();


  return (
    <Card style={{ maxHeight: "700px" }} className="mx-5 my-3 px-2 d-flex">
      <Row className="mx-3 my-5">
        <Col lg={2} md={3}>
          <Card.Img
            src={item.image}
            alt={item.title}
            style={{ maxHeight: "300px" }}
          />
        </Col>
        <Col lg={7} className="mt-5mx-auto">
          <Card.Title className="">{item.title}</Card.Title>
          <p className="">{item.description}</p>
        </Col>

        <Col lg={3} xs={6}>
          <h3 className="mx-auto d-inline-block ">Price: {item.price}$</h3>
          <NavLink
            to={{
              pathname: `${PRODUCT_ROUTE}/${item.id}`,
              otherProps: { item },
            }}
          >
            <Button className="d-block w-100 my-2">More info</Button>
          </NavLink>
          {accountType === "administrator" ? (
            <div>
              <NavLink
                to={{
                  pathname: `${EDIT_PRODUCT_ROUTE}/${item.id}`,
                  otherProps: { item },
                }}
              >
                <Button className="d-block w-100 my-2">Edit</Button>
              </NavLink>
              <Button
                className="d-block w-100 my-2"
                onClick={() => dispatch(deleteProduct(item.id))}
              >
                Delete
              </Button>
            </div>
          ) : (
            ""
          )}
          {props.children ? <props.children item={item} /> : undefined}
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCard;
