import React, {useState} from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { addNewProduct } from "./actions/products";

const NewProduct = () => {

  const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")

    const {categories} = useSelector((state) => state.products)

    const clearFields = () => {
        setTitle("")
        setPrice("")
        setDescription("")
        setCategory("")
        setImage("")
    }

  return (
    <Form>
      <table className="w-100 table">
        <tbody>
          <tr>
            <td>Название товара</td>
            <td><textarea style={{resize: "both"}} value={title} onChange={(event) => setTitle(event.target.value)}/></td>
          </tr>
          <tr>
            <td>Цена</td>
            <td><input value={price} onChange={(event) => setPrice(event.target.value)}/></td>
          </tr>
          <tr>
            <td>Описание товара</td>
            <td><textarea value={description} style={{resize: "both"}} onChange={(event) => setDescription(event.target.value)}/></td>
          </tr>
            <tr>
                <td>Категория товара</td>
                <td>
                <select class="form-select" aria-label="Category" onChange={(event) => {
                setCategory(event.target.value)}
              }>
                {categories.map(category => {
                  return (
                    <option value={category.title}>{category.title}</option>
                  )
                })}
              </select>
                </td>
            </tr>
          <tr>
            <td>Url картинки</td>
            <td><input value={image} onChange={(event) => setImage(event.target.value)}/></td>
          </tr>
        </tbody>
      </table>
      <Button onClick={() => {
          dispatch(addNewProduct({title, price, description, category, image}))
          clearFields()
    }}>Добавить товар</Button>
    </Form>
  );
};

export default NewProduct;
