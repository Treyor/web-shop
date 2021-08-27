import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { NavLink } from "react-router-dom";

import {NEW_PRODUCT_ROUTE} from "../utils/consts"

import { NEW_CATEGORY_ROUTE } from '../utils/consts'

const Admin = () => {
    return (
        <Container>           
            <NavLink to={NEW_PRODUCT_ROUTE}>
              <Button className="d-block w-100 my-2">Add product</Button>
            </NavLink>
            <NavLink to={NEW_CATEGORY_ROUTE}>
              <Button className="d-block w-25 my-2">Add category</Button>
            </NavLink>
        </Container>
    )
}

export default Admin