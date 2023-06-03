
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Button, Form, Row, Col } from 'react-bootstrap';
import '../../App.css';
import { SIGN_IN } from '../../constant/routes';
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
  async function signUpApi(payload) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };
    let response = () => {
      return new Promise(function (resolve, reject) {
        fetch("http://localhost:8080/api/store/", requestOptions

        ).then(response => {
          resolve(response);
        });
      });
    };
    let responseData = await response();
    console.log(responseData.data);
  }
  const postSignUpApi = async (payload) => {
    axios
      .post("http://localhost:8080/api/store/", payload,
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
      });
  }
  const handlePayload = () => {
    {
      let arrObj = []
      state.noOfRooms && Array.from({ length: state.noOfRooms }, (v, i) => {
        let columnInRoom = roomDetail[`columnInRoom${i + 1}`]
        let floorInRoom = roomDetail[`floorInRoom${i + 1}`]
        arrObj.push({ roomNo: i + 1, floorInRoom, columnInRoom })
      })
      return { ...state, roomDetails: arrObj }
    }
  }
  const submitForm = () => {
    const payload = handlePayload(state);
    postSignUpApi(payload)
    console.log('payload', payload)

  }
  console.log('roomDetail', roomDetail)
  console.log("state", state)
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
            <Form.Control type="textarea" name='address' value={state.address} placeholder="Enter store address" onChange={handleOnChange} />
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
          {state.noOfRooms && Array.from({ length: state.noOfRooms }, (v, i) =>
            <><Form.Group className="mb-3" controlId="formBasicRow">
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
            </Form.Group></>
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
