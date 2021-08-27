import React from "react";
import {
  Container
} from "react-bootstrap";
import { useSelector } from "react-redux";

import ProductCard from "../productCard";

const PurchaseList = () => {
  const purchaseHistory = useSelector(
    (state) => state.auth.currentUser.purchaseHistory
  );
  const reducer = (accumulator, currentValue) => accumulator + currentValue.price * currentValue.amount;

  const purchaseData =
    purchaseHistory.length > 0 ? (
      purchaseHistory.map((elem) => {
        for (let key in elem) {
          let date = new Date(+key);
          return (
            <Container className="mt-5">
              <div>{date.toLocaleString()}</div>
              <div>
                {elem[key].map((item) => {
                  return <ProductCard item={item} key={item.title} />;
                })}
                <div className="d-flex justify-content-around"><h2>Total: {elem[key].reduce(reducer, 0).toFixed(2)}$</h2></div>
              </div>
            </Container>
          );
        }
      })
    ) : (
      <Container>Empty</Container>
    );

  return <Container>{purchaseData}</Container>;
};

export default PurchaseList;
