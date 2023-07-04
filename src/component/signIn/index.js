import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../App.css';
import { SIGN_UP } from '../../constant/routes';
import { generateOtpApi, postSignInApi } from './handler';

const ValidationSchema = Yup.object().shape({
  otp: Yup.string().required('Please enter otp.'),
  phone: Yup.string().required('Please enter phone number'),
});
function SignIn() {
  const [phone, setPhone] = useState('')
  const [username, setUserName] = useState('')
  const [otp, setOtp] = useState('')
 
  const postSignInApi = async (payload) => {
    axios
      .post(`${BASE_API_URL}open/authenticate`, payload,
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
        console.log(response.data);
        sessionStorage.setItem("token",response.data.token);
       history.push('/store');
       
      });
  }

  
  const submitForm = () => {
    const payload = { username, otp };
    postSignInApi(payload);
  }

  return (
    <>
      <div className='heading item-center'>	<h1>SM STORE</h1></div>
      <div className="container main">
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            phone: '',
            otp: ''
          }}
          onSubmit={(values, formik) => submitForm(values, formik)}
        >{({ errors, touched, ...formikProps }) => (
          <FormikForm >
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" name="phone"
                value={phone} maxLength={10}
                onChange={(e) => {
                  setPhone(e.target.value)
                  setUserName(e.target.value)
                  formikProps.handleChange(e)
                }}
                onBlur={(e) => {
                  phone && generateOtpApi(phone, setOtp)
                  formikProps.handleBlur(e)
                }}
              />
              {errors.phone && touched.phone && <span className="error">{errors.phone}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicOtp">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='otp' value={otp}
                onChange={(e) => {
                  setOtp(e.target.value)
                  formikProps.handleChange(e)
                }}
                onBlur={formikProps.handleBlur} />
              {errors.otp && touched.otp && <span className="error">{errors.otp}</span>}
            </Form.Group>
            <div><Button variant="primary" type="submit" onClick={formikProps.submitForm}>
              LOG IN
            </Button></div>
            <div className='item-center'>New User? <Link to={SIGN_UP}>{' Sign up'}</Link></div>
          </FormikForm>
        )}
        </Formik>
      </div>
    </>
  );
}

export default SignIn;
