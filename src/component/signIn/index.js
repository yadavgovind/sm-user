import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../App.css';
import './index.css'
import { SIGN_UP } from '../../constant/routes';
import { generateOtpApi, postSignInApi } from './handler';
import potatoImg from '../../images/fresh-deesa-potato.jpeg'
const ValidationSchema = Yup.object().shape({
  otp: Yup.string().required('Please enter otp.'),
  phone: Yup.string().required('Please enter phone number'),
});
function SignIn() {
  const [phone, setPhone] = useState('')
  const [username, setUserName] = useState('')
  const [otp, setOtp] = useState('')


  const handleSubmit = () => {
    const payload = { username, otp };
    postSignInApi(payload);
  }

  useEffect(() => {
    sessionStorage.clear()
  }, [])
  return (
    <>
      <div className='bg-color'>
        <div className='heading item-center'>	<h1 className=' mr-50'>SM STORE</h1></div>
        <div className="container ">
          <div className="ss2-panel head-margin">
            <div className='row'>
              <div className='col-12 col-md-12 col-lg-7'>
                <div className='ss2-left'>
                  <div className='login-body'>
                    <h2 className='ss2-heading'>Log In</h2>
                    <p className='text'>Enter Your Phone And OTP To login your Account.</p>
                    <Formik
                      validationSchema={ValidationSchema}
                      initialValues={{
                        phone: '',
                        otp: ''
                      }}
                      onSubmit={(values, formik) => handleSubmit(values, formik)}
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
                        <div className='login-action'>
                          <Button className='btn btn-primary ss2-btn-1' type="submit">
                            LOG IN
                          </Button>
                          <p className=''>Don't have Account ? <Link to={SIGN_UP}>{' Sign Up'}</Link></p>
                        </div>
                      </FormikForm>
                    )}
                    </Formik>
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-12 col-lg-5'>
                <div className='ss2-right'>
                  <div className='ss2-image-login d-none d-lg-block'>
                    <img src={potatoImg} width='315px' alt=" " height='350px' style={{ borderRadius: "0 5px 5px 0" }} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
