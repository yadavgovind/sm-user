import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getAvailableLotsApi, handleBlur } from './handler';

function AddInventoryModal({ productType, roomsArr }) {
	const [currentModal, openModal] = useState(null);
	// const [selectedRoom, setRoom] = useState('');

	// const [lots, setLots] = useState([]);
	const [state, setState] = useState({
		firstName: '',
		email: '',

	})
	const { firstName, email } = state;



	useEffect(() => {
		getAvailableLots()
	}, [])
	const getRooms = () => {
		let options = []
		roomsArr.length && roomsArr.map((item, i) => {
			return options.push(<option key={i} value={item}>{item}</option>)

		})
		return options
	}
	const getProductTpyes = () => {
		let options = []
		productType.map(item => {
			return options.push(<option key={item.productId} value={item.productType}>{item.productType}{' '}{item.productSize}</option>)

		})
		return options
	}

	const getAvailableLots = (roomNo) => {
		const storeId = sessionStorage.getItem('storeId')
		getAvailableLotsApi(1, storeId.trim()).then((res) => {
			// let options = []
			console.log('res', res)
			// res.map(item => {
			// 	return options.push(<option key={item.productId} value={item.productType}>{item.productType}{' '}{item.productSize}</option>)

			// })

		}).catch(err => console.log(err))

	}
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
								onBlur={(e) => handleBlur(e.target.value, setState)}
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Customer's Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter full name"
								name='firstName'
								value={firstName}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name='email'
								value={email}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Room</Form.Label>
							<Form.Select aria-label="Default select example" onChange={(e) => console.log('val', e.target)}>
								<option>Select Room</option>
								{getRooms()}
							</Form.Select>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
							<Form.Label>Lots</Form.Label>
							<Form.Control
								type="text"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
							<Form.Label>Quantity</Form.Label>
							<Form.Control
								type="text"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
							<Form.Label>Product</Form.Label>
							<Form.Select aria-label="Default select example">
								<option>Select Product Type</option>
								{getProductTpyes()}

							</Form.Select>
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