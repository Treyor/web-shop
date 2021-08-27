import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../reducers/cartReducer";
import CartButton from "../cartButton";
import ProductCard from "../productCard";

import { addToPurchaseHistory } from "../actions/login";

const Basket = () => {
  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAuth = useSelector((state) => state.auth.currentUser.isAuth)
  const cartHistory = useSelector(
    (state) => state.auth.currentUser.purchaseHistory
  );
  const reducer = (accumulator, currentValue) =>
    accumulator + currentValue.amount * currentValue.price;
  const children = CartButton;

  const newObj = {
      [Date.now()]: cart
  }

  console.log(cart)

  const removeAllItemsFromCart = () => {
    dispatch(clearCart(cart));
  };

  return (
    <Container className="">
      <Row
        className="d-flex align-items-center justify-content-around"
        style={{ height: "50vh" }}
        lg-1
      >
        <Col>
          {cart.length === 0 ? (
            <>Корзина пуста</>
          ) : (
            <>
              <Row className="pt-5">
                <Button onClick={() => removeAllItemsFromCart()}>
                  Очистить корзину
                </Button>
              </Row>
              {cart.map((item) => {
                return (
                  <ProductCard item={item} key={item.id} children={children} />
                );
              })}
              Total: {cart.reduce(reducer, 0).toFixed(2)}
              {isAuth === true ? (

                <Button
                onClick={() => {
                  if (Boolean(currentUser)) {
                    dispatch(addToPurchaseHistory(currentUser.id, newObj, cartHistory))
                  } else {
                    console.log("nothing")
                  }
                }
                }
              >
                Оформить
              </Button>
              ) : (<div>Please, login to purchase products</div>)}
              
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Basket;
