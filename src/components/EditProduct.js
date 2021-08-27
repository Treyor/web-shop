import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { changeProductInfo } from "./actions/products";

const EditProduct = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector((state) => state.products.items[params.id - 1]);
  const categories = useSelector((state) => state.products.categories);
  const [id, setItemId] = useState(product.id);
  const [title, setItemTitle] = useState(product.title);
  const [price, setItemPrice] = useState(product.price);
  const [description, setItemDescription] = useState(product.description);
  const [category, setItemCategory] = useState(product.category);
  const [image, setItemImage] = useState(product.image);


  return (
    <Form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="w-25">
              Field
            </th>
            <th scope="col" className="w-25">Old</th>
            <th scope="col">New</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Id</td>
            <td>{product.id}</td>
            <td>
              <input
                type="text"
                value={id}
                onChange={(event) => setItemId(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td>{product.title}</td>
            <td>
              <textarea
                type="text"
                style={{ resize: "both" }}
                value={title}
                onChange={(event) => setItemTitle(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{product.price}</td>
            <td>
              <input
                type="text"
                value={price}
                onChange={(event) => setItemPrice(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{product.description}</td>
            <td>
              <textarea
                type="text"
                style={{ resize: "both" }}
                value={description}
                onChange={(event) => setItemDescription(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Category</td>
            <td>{product.category}</td>
            <td>
              <select
                class="form-select"
                aria-label="Category"
                onChange={(event) => {
                  setItemCategory(event.target.value);
                }}
              >
                <option selected>{product.category}</option>
                {categories.map((category) => {
                  return (
                    <option value={category.title}>{category.title}</option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>{product.image}</td>
            <td>
              <input
                type="text"
                placeholder={image}
                onChange={(event) => setItemImage(event.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          dispatch(changeProductInfo(id, { id, title, price, description, category, image }));
        }}
      >
        Изменить
      </Button>
    </Form>
  );
};

export default EditProduct;
