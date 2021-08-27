import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ButtonGroup, Button } from "react-bootstrap";
import { Wrench, Trash } from "react-bootstrap-icons";

import { deleteCategory } from "./actions/products";
import { setCurrentCategory } from "../reducers/productsReducer";
import { isFetchingData } from "../reducers/productsReducer";
import { changeCategoryTitle } from "./actions/categories";
import { renameItem } from "../reducers/categoriesReducer";

const CategoryItem = (props) => {

  const { category } = props;
  const [title, setTitle] = useState(category.title);

  const { isFetching } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.currentUser.accountType);
  const { currentCategory } = useSelector((state) => state.products);

  useEffect(() => {}, [isFetching]);

  const onChangeCategory = (category) => {
    dispatch(setCurrentCategory(category));
  };

  return (
    <>
      {isAdmin ? (
        <ListGroup>
          <ListGroup.Item className="d-flex">
            <input
              type="text"
              value={title}
              className="form-control"
              key={category.id}
              onChange={(event) => setTitle(event.target.value)}
            />
            <ButtonGroup className="p-0 m-0 w-25 d-flex">
              <Button
                className="rounded-0 p-1"
                onClick={() => {
                  dispatch(renameItem({ ...category, title }));
                  changeCategoryTitle(category, title);
                }}
              >
                <Wrench />
              </Button>
              <Button
                className="rounded-0 p-1"
                onClick={() => {
                  dispatch(deleteCategory(category.id));
                  dispatch(isFetchingData(true));
                }}
              >
                <Trash />
              </Button>
            </ButtonGroup>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <ListGroup.Item
          className={
            title === currentCategory
              ? "list-group-item-action active"
              : "list-group-item-action"
          }
          onClick={() => onChangeCategory(title)}
        >
          {title}
        </ListGroup.Item>
      )}
    </>
  );
};

export default CategoryItem;
