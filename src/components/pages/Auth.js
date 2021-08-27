import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { registerUser } from "../actions/login";
import { getUser } from "../actions/login";
import { setCurrentUser } from "../../reducers/loginReducer";
import { validateFields } from "../utils/validations";

const Auth = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const isLogin = location.pathname === LOGIN_ROUTE;
  const currentUserAuth = useSelector((state) => state.auth.currentUser.isAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");

  const [emailExist, setEmailExist] = useState(true);
  const [passwordMatchToEmail, setPasswordMatchToEmail] = useState(true);

  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [validateFirstName, setValidateFirstName] = useState(false);
  const [validateConfirmPassword, setValidateConfirmPassword] = useState(false);
  const [validateLastName, setValidateLastName] = useState(false);

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const validationOptions = {
    email: {
      isRequired: true,
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
      minLength: 8,
      maxLength: 16,
    },
    confirmPassword: {
      minLength: 8,
      maxLength: 16,
      comparePassword: password,
    },
    firstname: { minLength: 2, maxLength: 25 },
    lastname: { minLength: 2, maxLength: 25 },
  };

  const stateOptions = {
    email,
    password,
    confirmPassword,
    firstname,
    lastname,
    image,
    age,
  };

  const redirectToLogin = () => {
    history.push("/login");
  };

  const redirectToShop = () => {
    history.push("/");
  };

  const loginUser = async (email) => {
    getUser(email).then((data) => {
      if (data[0] !== undefined && data[0].email === email) {
        setEmailExist(true);
        if (data[0].password === password) {
          setPasswordMatchToEmail(true);
          setLogin(true);
          return dispatch(
            setCurrentUser({ ...data[0], isAuth: !currentUserAuth })
          );
        } else {
          setPasswordMatchToEmail(false);
        }
      } else {
        setEmailExist(false);
      }
    });
  };

  const registerNewUser = () => {
    const timeout = 1000;
    if (
      validateEmail === true &&
      validatePassword === true &&
      validateConfirmPassword === true &&
      validateFirstName === true &&
      validateLastName === true
    ) {
      setRegister(true);
      registerUser({
        email,
        password,
        firstname,
        lastname,
        image:
          image.length > 0
            ? image
            : "https://www.networthlists.com/wp-content/uploads/2020/09/net-worth-lists-default-image-768x512.png",
        age,
        isAuth: false,
        purchaseHistory: [],
      });
      setTimeout(redirectToLogin, timeout);
    }
    
  };

  const button = isLogin ? (
    <Button
      variant="primary"
      type="submit"
      className="ml-auto"
      onClick={(event) => {
        event.preventDefault();
        loginUser(email, password);
      }}
    >
      Войти
    </Button>
  ) : (
    <Button
      disabled={    (
        validateEmail === true &&
        validatePassword === true &&
        validateConfirmPassword === true &&
        validateFirstName === true &&
        validateLastName === true
      ) ? false : true}
      variant="primary"
      type="submit"
      className="ml-auto"
      onClick={(event) => {
        event.preventDefault();
        registerNewUser();
      }}
    >
      Регистрация
    </Button>
  );

  const successAuth = (text, callback) => {
    setTimeout(callback, 1000);
    return (
      <Card className="card p-5" style={{ width: 600 }}>
        <h2 className="m-auto">{text}</h2>
      </Card>
    );
  };

  const registrationCard = (
    <>
      <Form.Group controlId="formBasicConfirmPassword">
        <Form.Label>
          Confirm Password {validatePassword ? "" : "is incorrect"}
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(event) => {setConfirmPassword(event.target.value)
          }}
          onBlur={() =>
            validateFields(
              validationOptions.confirmPassword,
              stateOptions.confirmPassword,
              setValidateConfirmPassword
            )
          }
        />
      </Form.Group>

      <Form.Group controlId="formBasicFirstname">
        <Form.Label
          style={!validateFirstName ? { color: "red" } : { color: "black" }}
        >
          Firstname {validateFirstName ? "" : "length is incorrect"}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Firstname"
          value={firstname}
          onChange={(event) => {
            setFirstname(event.target.value);
          }}
          onBlur={() =>
            validateFields(
              validationOptions.firstname,
              stateOptions.firstname,
              setValidateFirstName
            )
          }
        />
      </Form.Group>

      <Form.Group controlId="formBasicLastname">
        <Form.Label>Lastname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Lastname"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          onBlur={() =>
            validateFields(
              validationOptions.lastname,
              stateOptions.lastname,
              setValidateLastName
            )
          }
        />
      </Form.Group>

      <Form.Group controlId="formBasicImage">
        <Form.Label className="form-label">Image</Form.Label>
        <Form.Control
          type="text"
          placeholder="Image"
          className="form-control"
          value={image}
          onChange={(event) => {
            setImage(event.target.value);
          }}
        />
      </Form.Group>

      <Form.Group controlId="formBasicAge">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          placeholder="Age"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
      </Form.Group>
    </>
  );

  const loginCard = (
    <>
      <Form.Group controlId="formBasicEmail">
        <Form.Label
          style={
            !validateEmail || !emailExist
              ? { color: "red" }
              : { color: "black" }
          }
        >
          Email address{" "}
          {isLogin
            ? emailExist
              ? ""
              : "does not exist"
            : validateEmail
            ? ""
            : "is incorrect"}
        </Form.Label>
        <Form.Control
          style={!validateEmail ? { borderColor: "red" } : {}}
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() =>
            validateFields(
              validationOptions.email,
              stateOptions.email,
              setValidateEmail
            )
          }
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label
          style={
            !validatePassword || !passwordMatchToEmail
              ? { color: "red" }
              : { color: "black" }
          }
        >
          Password{" "}
          {isLogin
            ? emailExist
              ? passwordMatchToEmail
                ? ""
                : "is incorrect"
              : ""
            : ""}
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={() =>
            validateFields(
              validationOptions.password,
              stateOptions.password,
              setValidatePassword
            )
          }
        />
      </Form.Group>
    </>
  );

  const formCard = login ? (
    successAuth("Вы успешно вошли!", redirectToShop)
  ) : register ? (
    successAuth("Вы успешно зарегистрировались!")
  ) : (
    <Card className="card p-5" style={{ width: 600 }}>
      <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
      <Form className="d-flex flex-column">
        {loginCard}
        {isLogin ? <></> : registrationCard}
        <Form.Group className="d-flex align-items-center">
          {isLogin ? (
            <Form.Label>
              Нет аккаунта?
              <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйтесь!</NavLink>
            </Form.Label>
          ) : (
            <Form.Label>
              Есть аккаунт?
              <NavLink to={LOGIN_ROUTE}> Авторизуйтесь!</NavLink>
            </Form.Label>
          )}
          {button}
        </Form.Group>
      </Form>
    </Card>
  );

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 50 }}
    >
      {formCard}
    </Container>
  );
};

export default Auth;
