import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../actions/products";
import { getCategories } from "../actions/products";
import ProductCard from "../productCard";
import CategoriesBlock from "../categoriesBlock";
import SearchPanel from "../searchPanel";
import { NEW_PRODUCT_ROUTE } from "../utils/consts";


const Shop = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { items, currentCategory } = useSelector((state) => state.products);

  const isAdmin = useSelector((state) => state.auth.currentUser.accountType);

  const { searchQuery } = useSelector((state) => state.products);

  useEffect(() => {
    if (items.length <= 0) {
      setLoading(true);
      dispatch(getProducts())
        .then(() => {
          setLoading(false);
        })
    }
    dispatch(getCategories())
  }, []);

  const findItem = (items) => {
    return items.filter((item) => {
      if (searchQuery.length === 0) {
        return item;
      } else {
        return item.title.toLowerCase().indexOf(searchQuery) !== -1;
      }
    });
  };

  const filterProducts = (categ = currentCategory) => {
    return findItem(items).filter((item) =>
      currentCategory === "" ? item : item.category === categ
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="d-flex justify-content-center mt-4">
            <SearchPanel />
            {isAdmin ? (
              <NavLink to={NEW_PRODUCT_ROUTE}>
              <Button>Add new product</Button>
            </NavLink>
            ) : (
              ""
            )}
            
          </div>
        </Col>
      </Row>

      <Row>
        <CategoriesBlock />
        <Col xs={3} sm={6} md={8} lg={9} xl={9}>
          {filterProducts().length !== 0 ? (
            filterProducts().map((item) => (
              <ProductCard item={item} key={item.id} />
            ))
          ) : (
            <div className="mx-5 my-3 px-2 d-flex justify-content-center align-items-center h-100">
              No items were found
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
