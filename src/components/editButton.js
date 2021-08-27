import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { EDIT_PRODUCT_ROUTE } from "./utils/consts";

const EditButton = (props) => {
  const { id } = props.item;
  return (
    <NavLink to={EDIT_PRODUCT_ROUTE + `/${id}`}>
      <Button className="d-block w-100 my-2">Text</Button>
    </NavLink>
  );
};

export default EditButton;
