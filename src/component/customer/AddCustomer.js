import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddCustomer() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true)
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				<i class="fa-solid fa-plus"></i> Add Customer
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Customer</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label> Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter full name"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label> Phone number</Form.Label>
							<Form.Control
								type="number"
								placeholder=""
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
							<Form.Label>Room</Form.Label>
							<Form.Control
								type="number"
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default AddCustomer