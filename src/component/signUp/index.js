
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import '../../App.css';
import { SIGN_IN } from '../../constant/routes';
import { postSignUpApi } from './handler';
function SignUp() {
  const [state, setState] = useState({})
  const [roomDetail, setRoomDetail] = useState({})

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value })
  }
  const handleRoomDetail = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRoomDetail({
      ...roomDetail, [name]: value
    })
  }

  const submitForm = () => {
    postSignUpApi(state, roomDetail)
  }

  return (
    <>
      <div className='heading item-center'>	<h1>SM STORE</h1></div>
      <div className="container main">
        <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Name</Form.Label>
            <Form.Control type="text" name="storeName" value={state.storeName} placeholder="Enter store name" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" value={state.email} placeholder="Enter email" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="number" name='phone' value={state.phone} placeholder="Enter phone number" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Address</Form.Label>
            <Form.Control type="textarea" name='address' rows="5" value={state.address} placeholder="Enter store address" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Area</Form.Label>
            <Form.Control type="text" name='area' value={state.area} placeholder="Enter area" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Registration Key</Form.Label>
            <Form.Control type="text" name="registrationKey" value={state.registrationKey} placeholder="Enter registration key" onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRoom">
            <Form.Label>Number of rooms</Form.Label>
            <Form.Control type="number" name="noOfRooms" value={state.noOfRooms} placeholder="Enter Rooms" onChange={handleOnChange} />
          </Form.Group>
          {state.noOfRooms && Array.from({ length: state.noOfRooms }, (v, i) => {
            return (<><Form.Group className="mb-3" controlId="formBasicRow">
              <Row>
                <Col sm={2}>
                  {i === 0 && <Form.Label>Room No</Form.Label>}
                  <Form.Control type="number" placeholder="" value={i + 1} disabled />
                </Col>
                {/* <Col>
                  {i == 0 && <Form.Label>Room Capacity</Form.Label>}
                  <Form.Control type="number" name={`roomCapacity${[i + 1]}`} onChange={handleOnChange}
                    value={state.roomCapacity && state.roomCapacity[i + 1]} placeholder="Enter room capacity" />
                </Col> */}
                <Col>
                  {i === 0 && <Form.Label>Floors</Form.Label>}
                  <Form.Control type="number" name={`floorInRoom${[i + 1]}`} onChange={handleRoomDetail}
                    value={roomDetail.floorInRoom && roomDetail.floorInRoom[i + 1]} placeholder="Enter floors" />
                </Col>
                <Col>
                  {i === 0 && <Form.Label>Columns</Form.Label>}
                  <Form.Control type="number" name={`columnInRoom${[i + 1]}`} onChange={handleRoomDetail}
                    value={roomDetail.columnInRoom && roomDetail.columnInRoom[i + 1]} placeholder="Enter columns" />
                </Col>
                {/* <Col>
                  {i == 0 && <Form.Label>Capacity</Form.Label>}
                  <Form.Control type="number" name={`perLotCapacity${[i + 1]}`} onChange={handleOnChange}
                    value={state.perLotCapacity && state.perLotCapacity[i + 1]} placeholder="Enter per lot capacity" />
                </Col> */}
              </Row>
            </Form.Group></>)
          }
          )}
          <Button variant="primary" onClick={() => submitForm()}>
            SIGN UP
          </Button>
        </Form>
        <div className='item-center'>Already have account? <Link to={SIGN_IN}>{' Log in'}</Link></div>
      </div>
    </>
  );
}

export default SignUp;
