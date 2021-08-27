import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, ListGroup } from "react-bootstrap";

import { isFetchingData } from "../reducers/productsReducer";
import { setCurrentCategory } from "../reducers/productsReducer";
import { addNewCategory } from "./actions/categories";
import CategoryItem from "./categoryItem";

const CategoriesBlock = () => {
  const isAdmin = useSelector((state) => state.auth.currentUser.accountType);
  const dispatch = useDispatch();

  const [placeholder, setPlaceholder] = useState("")
  const { categories, currentCategory } = useSelector(
    (state) => state.products
  );

  const onChangeCategory = (category) => {
    dispatch(setCurrentCategory(category));
  };

  return (
    <Col xs={2} sm={3} md={3} lg={3} xl={2} style={{overflowY: "auto", height: "500px"}}>
      <ListGroup className="my-2 pt-2">
        <ListGroup.Item
          className={
            currentCategory === ""
              ? "list-group-item-action active"
              : "list-group-item-action"
          }
          style={{ cursor: "pointer" }}
          onClick={() => onChangeCategory("")}
        >
          Show all
        </ListGroup.Item>
        {categories.map(category => 
          <CategoryItem category={category}/>
          )}
          {isAdmin ? (
        <ListGroup.Item className="d-flex p-0">
          <input
            type="text"
            className="form-control"
            placeholder="Category name"
            onChange={(event) => setPlaceholder(event.target.value)}
            value={placeholder}
          />
          <Button
            className="ml-auto"
            onClick={() => {

              dispatch(addNewCategory({ title: placeholder }));

              dispatch(isFetchingData(true))
              setPlaceholder("");
            }}
          >
            +
          </Button>
        </ListGroup.Item>
      ) : (
        ""
      )}
      </ListGroup>
    </Col>
  );
};

export default CategoriesBlock;
