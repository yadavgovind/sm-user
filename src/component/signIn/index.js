import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import '../../App.css';
import { SIGN_UP } from '../../constant/routes';
import { generateOtpApi, postSignInApi } from './handler';

function SignIn() {
  const [phone, setPhone] = useState('')
  const [username, setUserName] = useState('')
  const [otp, setOtp] = useState('')

  const submitForm = () => {
    const payload = { username, otp };
    postSignInApi(payload);
  }

  return (
    <>
      <div className='heading item-center'>	<h1>SM STORE</h1></div>
      <div className="container main">
        <Form >
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" name="phone"
              value={phone} maxLength={10}
              onChange={(e) => {
                setPhone(e.target.value)
                setUserName(e.target.value)
              }}
              onBlur={() => generateOtpApi(phone, setOtp)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Label>OTP</Form.Label>
            <Form.Control type="password" placeholder="Password"
              name='otp' value={otp}
              onChange={(e) => setOtp(e.target.value)} />
          </Form.Group>
          <div><Button variant="primary" onClick={() => submitForm()}>
            LOG IN
          </Button></div>
          <div className='item-center'>New User? <Link to={SIGN_UP}>{' Sign up'}</Link></div>
        </Form>
      </div>
    </>
  );
}

export default SignIn;
