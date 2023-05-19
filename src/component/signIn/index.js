
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import '../../App.css';
import { FORGET_PASSWORD, SIGN_UP } from '../../constant/routes';
function SignIn() {
  return (
    <>
      <div className='heading item-center'>	<h1>SM STORE</h1></div>
      <div className="container main">
        <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Link to={FORGET_PASSWORD}>Forgot password</Link>
          </Form.Group>

          <div><Button variant="primary" type="submit">
            LOG IN
          </Button></div>
          <div className='item-center'>New User? <Link to={SIGN_UP}>{' Sign up'}</Link></div>
        </Form>
      </div>
    </>
  );
}

export default SignIn;
