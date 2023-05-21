
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import '../../App.css';
import { SIGN_IN } from '../../constant/routes';
function SignUp() {
  const [state, setState] = useState({})
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ [name]: value })
  }
  return (
    <>
      <div className='heading item-center'>	<h1>SM STORE</h1></div>
      <div className="container main">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Full name</Form.Label>
            <Form.Control type="name" placeholder="Enter full name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" value={state.email} placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" placeholder="Enter phone number" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRoom">
            <Form.Label>Number of rooms</Form.Label>
            <Form.Control type="number" name="rooms" placeholder="Enter Rooms" onChange={handleOnChange} />
          </Form.Group>
          {state.rooms &&
            <><Form.Group className="mb-3" controlId="formBasicRow">
              <Form.Label>Number of rows</Form.Label>
              <Form.Control type="number" placeholder="Enter rows" />
            </Form.Group><Form.Group className="mb-3" controlId="formBasicColumn">
                <Form.Label>Number of columns</Form.Label>
                <Form.Control type="number" placeholder="Enter columns" />
              </Form.Group></>}
          <Button variant="primary" type="submit">
            SIGN UP
          </Button>
        </Form>
        <div className='item-center'>Already have account? <Link to={SIGN_IN}>{' Log in'}</Link></div>
      </div>
    </>
  );
}

export default SignUp;
