import React, {useState} from 'react'
import { Container, Button } from 'react-bootstrap'

import { addNewCategory } from './actions/categories'

const NewCategory = () => {
    const [title, setTitle] = useState('')
    return (
        <Container>
            <input type="text" onChange={(event) => setTitle(event.target.value)}></input>
            <Button onClick={() => addNewCategory({title})}>Add category</Button>
        </Container>
    )
}

export default NewCategory