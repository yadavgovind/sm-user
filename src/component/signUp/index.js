
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import '../../App.css';
import { SIGN_IN } from '../../constant/routes';
function SignUp() {
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
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          </Form.Group>
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
