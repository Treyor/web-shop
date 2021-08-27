import React, { useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CartDash, CartPlus } from "react-bootstrap-icons";

import { addToCart, setAmount, removeFromCart } from "../reducers/cartReducer";

const CartButton = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const addItemToCart = (item) => {
    dispatch(addToCart({ ...item, amount: 1 }));
  };

  const remove = () => {
    cart.map((element, index) => {
      if (element.id === item.id) {
        dispatch(removeFromCart(cart[index]));
      }
    });
  };

  useEffect(() => {
    cart.map((item, index) =>
      item.amount !== 0 ? item.amount : dispatch(removeFromCart(cart[index]))
    );
  }, [cart]);

  const changeAmount = (operation) => {
    cart.map((element) => {
      if (element.id === item.id) {
        dispatch(setAmount({ ...element, amount: element.amount + operation }));
      }
    });
  };

  const isInCart = (element) => {
    if (element.id === item.id) {
      return element.id;
    } else {
      return false;
    }
  };

  return (
    <ButtonGroup className="align-items-center w-100 bg-primary rounded bg-light">
      {cart.find(isInCart) ? (
        <>
          <Button
            className="border-left rounded"
            onClick={() => changeAmount(-1)}
          >
            <CartDash />
          </Button>

          {cart.map((element) =>
            element.id === item.id ? (
              <p className="d-flex w-25 justify-content-around m-0 pb-1 pt-1">
                {element.amount}
              </p>
            ) : (
              false
            )
          )}
          <Button
            className="border-right rounded"
            onClick={() => changeAmount(+1)}
          >
            <CartPlus />
          </Button>
          <Button className="ml-2" onClick={() => remove()}>
            Remove
          </Button>
        </>
      ) : (
        <Button
          className="d-inline-block w-75"
          onClick={() => {
            addItemToCart(item);
          }}
        >
          Add to cart
        </Button>
      )}
    </ButtonGroup>
  );
};

export default CartButton;
