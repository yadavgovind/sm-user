import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { addCustomerApi } from './handler';
import { tokenDecode } from '../../constant/api';

function AddCustomer() {
	const [show, setShow] = useState(false);
	const [state, setState] = useState({})

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true)
	};


	const handleOnChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setState({ ...state, [name]: value })
	}

	const handleSubmit = async () => {
		let detail = tokenDecode()
		const payload = { ...state, 'storeId': detail.storeId }
		addCustomerApi(payload, sessionStorage.getItem('token')).then((res) => {
			setShow(false)
		}).catch((err) => {
			toast.error(err.message)
			setShow(false)
		})

	}
	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				<i className="fa-solid fa-plus"></i> Add User
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>User Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter full name"
								name="firstName"
								onChange={handleOnChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label> Phone number</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter phone number"
								name="phone"
								maxLength={10}
								onChange={handleOnChange}

							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								name="email"
								onChange={handleOnChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
							<Form.Label>Vehicle number</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter vehicle number"
								name="vehicleNumber"
								onChange={handleOnChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter address"
								name="address"
								onChange={handleOnChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Role type</Form.Label>
							<Form.Control
								as="select"
								name="roleType"
								aria-label="Default select example"
								onChange={(e) => handleOnChange(e)}>
								<option value=''>Select User Role</option>
								<option value='customer'>Customer</option>
								<option value='supplier'>Supplier</option>
							</Form.Control>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default AddCustomer