import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {NavBar} from "./components/NavBar";
import { Row, Col } from "react-bootstrap";

import Loader from "./components/Preloader";

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
    <NavBar/>
    {loading ? (
      <Row>
          <Col
            className="d-flex align-items-center justify-content-around"
            style={{ height: "50vh" }}
          >
            <Loader />
          </Col>
        </Row>
    ) : (<AppRouter />)}
      
      
      {/* <div className="App">
        <Navigation />
      </div> */}
    </BrowserRouter>
  );
};

export default App;
