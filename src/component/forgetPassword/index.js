
import { Button, Form } from 'react-bootstrap';
import '../../App.css';
import history from '../../store/history';
import { SIGN_IN } from '../../constant/routes';
function SignIn() {
  return (
    <>
      <div className='heading item-center'>	<h1>SM STORE</h1></div>
      <div className="container main">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Button variant="outline-dark" type="submit" onClick={() => history.push(SIGN_IN)}>
              Cancel
            </Button>
            {'   '}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default SignIn;
