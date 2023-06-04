import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import '../../App.css';
import { SIGN_UP, BASE_API_URL } from '../../constant/routes';
import history from '../../store/history';

function SignIn() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const generateOtpApi = async () => {
    axios
      .get(`${BASE_API_URL}generateOtp?mob=${phone}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "origin, content-type, accept, x-requested-with",
            "Access-Control-Max-Age": "3600"
          }
        })
      .then((response) => {
        setOtp(response.data)
        window.alert(response.data)
      });
  }
  const handleBlur = () => {
    generateOtpApi()
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
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => handleBlur()}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Label>OTP</Form.Label>
            <Form.Control type="password" placeholder="Password"
              name='otp' value={otp}
              onChange={(e) => setOtp(e.target.value)} />
          </Form.Group>
          <div><Button variant="primary" type="submit" onClick={() => {
            history.push('/store')
          }}>
            LOG IN
          </Button></div>
          <div className='item-center'>New User? <Link to={SIGN_UP}>{' Sign up'}</Link></div>
        </Form>
      </div>
    </>
  );
}

export default SignIn;
