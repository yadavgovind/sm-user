
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form as FormikForm, FieldArray } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../App.css';

import { SIGN_IN } from '../../constant/routes';
import { postSignUpApi } from './handler';

const ValidationSchema = Yup.object().shape({
  storeName: Yup.string().required('Please enter store name.'),
  email: Yup.string().required('Please enter email.'),
  phone: Yup.string().required('Please enter phone number'),
  address: Yup.string().required('Please enter address.'),
  area: Yup.string().required('Please enter area.'),
  registrationKey: Yup.string().required('Please enter registration key.'),
  noOfRooms: Yup.string().required('Please enter room.'),
  roomDetails: Yup.array()
    .of(
      Yup.object().shape({
        floorInRoom: Yup.string().required('Please enter floor.'),
        columnInRoom: Yup.string().required('Please enter column.'),
        perLotCapacity: Yup.string().required('Please enter lot capacity.'),
        roomNo: Yup.string()
      })
    )
});
function SignUp() {
  const [isSubmit, setSubmit] = useState(false)
  const submitForm = (values) => {
    if (values.roomDetails.length) {
      setSubmit(true)
      postSignUpApi(values, setSubmit)
    }
  }

  return (
    <>
      <div className='heading item-center'>	<h1>SM STORE</h1></div>
      <div className="container main">
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            storeName: '',
            email: '',
            phone: '',
            address: '',
            area: '',
            registrationKey: '',
            noOfRooms: '',
            roomDetails: []
          }}
          onSubmit={(values, formik) => submitForm(values, formik)}
        >{({ errors, touched, ...formikProps }) => (

          <FormikForm >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Name</Form.Label>
              <Form.Control
                type="text"
                name="storeName"
                value={formikProps.values.storeName}
                placeholder="Enter store name"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur} />
              {errors.storeName && touched.storeName && <span className="error">{errors.storeName}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formikProps.values.email}
                placeholder="Enter email"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
              />
              {errors.email && touched.email && <span className="error">{errors.email}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                name='phone'
                value={formikProps.values.phone}
                placeholder="Enter phone number"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur} />
              {errors.phone && touched.phone && <span className="error">{errors.phone}</span>}

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Address</Form.Label>
              <Form.Control type="textarea" name='address'
                rows="5" value={formikProps.values.address} placeholder="Enter store address"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur} />
              {errors.address && touched.address && <span className="error">{errors.address}</span>}

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Area</Form.Label>
              <Form.Control type="text" name='area'
                value={formikProps.values.area} placeholder="Enter area"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur} />
              {errors.area && touched.area && <span className="error">{errors.area}</span>}

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Registration Key</Form.Label>
              <Form.Control type="text"
                name="registrationKey"
                value={formikProps.values.registrationKey}
                placeholder="Enter registration key"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur} />
              {errors.registrationKey && touched.registrationKey && <span className="error">{errors.registrationKey}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRoom">
              <Form.Label>Number of rooms</Form.Label>
              <Form.Control type="text"
                name="noOfRooms" value={formikProps.values.noOfRooms}
                placeholder="Enter Rooms"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur} />
              {errors.noOfRooms && touched.noOfRooms && <span className="error">{errors.noOfRooms}</span>}
            </Form.Group>
            {console.log(formikProps)}
            <FieldArray name="roomDetails">
              {({ remove, push }) => (
                <Fragment>
                  {formikProps.values.noOfRooms && Array.from({ length: formikProps.values.noOfRooms }, (v, i) => {
                    let floorInRoom = `roomDetails[${i}].floorInRoom`;
                    let columnInRoom = `roomDetails[${i}].columnInRoom`;
                    let perLotCapacity = `roomDetails[${i}].perLotCapacity`;
                    let roomNo = `roomDetails[${i}].roomNo`;

                    return (
                      <Fragment key={`${i}-room`}><Form.Group className="mb-3" controlId="formBasicRow" >
                        <Row>
                          <Col sm={2}>
                            {i === 0 && <Form.Label>Room No</Form.Label>}
                            <Form.Control type="text" placeholder="" value={i + 1} disabled
                              name={roomNo}
                            />
                          </Col>
                          <Col>
                            {i === 0 && <Form.Label>Floors</Form.Label>}
                            <Form.Control type="text"
                              name={floorInRoom}
                              onChange={formikProps.handleChange}
                              onBlur={formikProps.handleBlur}
                              placeholder="Enter floors" />
                            {errors.roomDetails && errors.roomDetails[i] && errors.roomDetails[i]?.floorInRoom && touched.roomDetails && touched.roomDetails[i]?.floorInRoom && <span className="error">{errors.roomDetails[i].floorInRoom}</span>}

                          </Col>
                          <Col>
                            {i === 0 && <Form.Label>Columns</Form.Label>}
                            <Form.Control type="text"
                              name={columnInRoom}
                              onChange={formikProps.handleChange}
                              onBlur={formikProps.handleBlur}
                              placeholder="Enter columns" />
                            {errors.roomDetails && errors.roomDetails[i]?.columnInRoom && touched.roomDetails && touched.roomDetails[i]?.columnInRoom &&
                              <span className="error">{errors.roomDetails[i].columnInRoom}</span>}

                          </Col>
                          <Col>
                            {i === 0 && <Form.Label>LotCapacity</Form.Label>}
                            <Form.Control type="text"
                              name={perLotCapacity}
                              onChange={formikProps.handleChange}
                              onBlur={formikProps.handleBlur}
                              placeholder="Enter Lot Capacity" />
                            {errors.roomDetails && errors.roomDetails[i]?.perLotCapacity &&
                              touched.roomDetails && touched.roomDetails[i]?.perLotCapacity &&
                              <span className="error">{errors.roomDetails[i].perLotCapacity}</span>}

                          </Col>
                        </Row>
                      </Form.Group></Fragment>)
                  }
                  )}
                </Fragment>
              )}
            </FieldArray>
            <Button variant="primary"
              type="submit"
              disabled={isSubmit}
              onClick={formikProps.submitForm}
            >
              SIGN UP
            </Button>
          </FormikForm>
        )}
        </Formik>
        <div className='item-center'>Already have account? <Link to={SIGN_IN}>{' Log in'}</Link></div>
      </div>
    </>
  );
}

export default SignUp;
