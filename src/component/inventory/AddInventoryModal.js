import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddInventoryModal() {
	const [currentModal, openModal] = useState(null);


	return (
		<>
			<Button variant="primary" onClick={() => openModal("add-inventory")}>
				<i class="fa-solid fa-plus"></i>
			</Button>
			{currentModal === "add-inventory" && <Modal show onHide={() => openModal(null)}>
				<Modal.Header closeButton>
					<Modal.Title>Add Inventory</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Button variant="primary" onClick={() => openModal('add-customer')}>
								<i class="fa-solid fa-plus"></i> Add Customer
							</Button>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Customer's Phone number</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter customer phone number"
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Customer's Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter full name"
								autoFocus
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Room</Form.Label>
							<Form.Control
								type="number"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
							<Form.Label>Lots</Form.Label>
							<Form.Control
								type="number"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
							<Form.Label>Quantity</Form.Label>
							<Form.Control
								type="number"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
							<Form.Label>Product</Form.Label>
							<Form.Control
								type="text"
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => openModal(null)}>
						Close
					</Button>
					<Button variant="primary" onClick={() => openModal(null)}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			}
			{currentModal === "add-customer" && <Modal show onHide={() => openModal(null)}>
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
					<Button variant="secondary" onClick={() => openModal(null)}>
						Close
					</Button>
					<Button variant="primary" onClick={() => openModal(null)}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>}
		</>
	);
}

export default AddInventoryModal 