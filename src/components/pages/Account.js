import React, { useState } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { PURCHASE_LIST_ROUTE } from "../utils/consts";
import { changeAccountData } from "../actions/login";

const Account = () => {

  const dispatch = useDispatch();

  const [readOnly, setReadOnly] = useState(true);

  const userInfo = useSelector((state) => state.auth.currentUser);

  const [firstname, setFirstname] = useState(userInfo.firstname);
  const [lastname, setLastName] = useState(userInfo.lastname);
  const [age, setAge] = useState(userInfo.age);
  const [email, setEmail] = useState(userInfo.email);
  const [image, setImage] = useState(userInfo.image);

  const stateInfo = {
    firstname,
    lastname,
    age,
    email,
    image,
    password: userInfo.password,
    id: userInfo.id,
    purchaseHistory: userInfo.purchaseHistory || [],
    accountType: userInfo.accountType || "user",
    isAuth: userInfo.isAuth,
  }

  return (
    <Container className="mt-5">
      {readOnly ? (
        <div>
          <img
            src={image}
            alt="none"
            className="rounded-circle"
            style={{ height: "170px", width: "150px" }}
          />
          <div>Фамилия: {lastname}</div>
          <div>Имя: {firstname}</div>
          <div>Почта: {email}</div>
          <div>Возраст: {age}</div>
        </div>
      ) : (
        <div>
          <img
            src={image}
            alt="none"
            className="rounded-circle"
            style={{ maxHeight: "200px", maxWidth: "200px" }}
          />
          <div>
            Фамилия:{" "}
            <input
              type="text"
              value={lastname}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div>
            Имя:{" "}
            <input
              type="text"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
          </div>
          <div>
            Возраст:{" "}
            <input
              type="text"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </div>
        </div>
      )}

      {readOnly ? (
        <Button onClick={() => setReadOnly(false)}>Редактирова профиль</Button>
      ) : (
        <Button
          onClick={() => {
            dispatch(changeAccountData(stateInfo))
            setReadOnly(true);
          }}
        >
          Сохранить изменения
        </Button>
      )}

      <Nav>
        <NavLink to={PURCHASE_LIST_ROUTE}>
          <Button>To purchase history</Button>
        </NavLink>
      </Nav>
    </Container>
  );
};

export default Account;
