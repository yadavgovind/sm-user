import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { handleBlur, outInventoryApi } from './handler';
import { toast } from 'react-toastify';

function OutInventoryModal() {
	const [currentModal, openModal] = useState(null);
	const [lotsOption, setLotOption] = useState([]);
	const [availableQuantity, setAvailableQuantity] = useState(0);
	const [lotArr, setLotsArr] = useState([]);
	const [maxQuantityError, setMaxQuantityError] = useState(false)
	const [state, setState] = useState({
		lotNo: '',
		quantity: '',
		reasonOfOut: '',
		soldBusinessManId: ''
	})

	const { quantity, reasonOfOut, soldBusinessManId, weight } = state;

	const handleOnChangeLot = (lotNo) => {
		const selectedLot = lotArr.find(item => item.generatedLotName === lotNo)
		setAvailableQuantity(selectedLot.currentLotCapacity)
		setState({ ...state, lotNo, currentQuantity: selectedLot.currentLotCapacity })
	}
	const handleOnChange = (key, value) => {
		// if (key === 'quantity' && (value > (availableQuantity) || value <= 0)) {
		// 	setMaxQuantityError(true)
		// } else {
		setState({ ...state, [key]: value })
		// setMaxQuantityError(false)
		// }
	}

	const handleSubmit = () => {
		// const payload = getPayload(state)
		if (!state.lotNo || !state.quantity || !state.roomNo) {
			toast.error('Please fill the required fields.')
		} else {
			outInventoryApi(state).then(() => {
				openModal(null)
				setState({})
				toast.success("Inventory out successfully")
			}).catch(err => toast.error((err && err.message) || 'Something went wrong.'))
		}

	}
	return (
		<>
			<Button variant="primary" onClick={() => openModal("out-inventory")}>
				<i class="fa-solid fa-plus"></i>
			</Button>
			{currentModal === "out-inventory" && <Modal show onHide={() => openModal(null)}>
				<Modal.Header closeButton>
					<Modal.Title>Out Inventory</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Customer's Phone number</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter customer phone number"
								onBlur={(e) => handleBlur(e.target.value, setState)}
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
							<Form.Label>Lots No</Form.Label>
							<Form.Control
								as="select"
								name="lotNo"
								aria-label="Default select example"
								onChange={(e) => handleOnChangeLot(e.target.value)}>
								<option>Select lots</option>
								{lotsOption.length ? lotsOption.map(item => item) : ''}
							</Form.Control>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
							<Form.Label>Quantity</Form.Label>
							<Form.Control
								type="number"
								name='quantity'
								placeholder="Quantity"
								value={quantity}
								max={availableQuantity}
								onChange={(e) => handleOnChange(e.target.name, e.target.value)}
							/>
							{maxQuantityError && <span style={{ color: 'red' }}>Please enter quantity less than or equal to {availableQuantity}</span>}
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
							<Form.Label>Weight</Form.Label>
							<Form.Control
								type="text"
								name='weight'
								placeholder="Weight"
								value={weight}
								onChange={(e) => handleOnChange(e.target.name, e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Reason Of Out</Form.Label>
							<Form.Control
								type="text"
								placeholder="Reason of out"
								name='reasonOfOut'
								value={reasonOfOut}
								onChange={(e) => handleOnChange(e.target.name, e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Sold Business Man Id</Form.Label>
							<Form.Control
								type="text"
								placeholder="soldBusinessManId"
								name='soldBusinessManId'
								value={soldBusinessManId}
								onChange={(e) => handleOnChange(e.target.name, e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => openModal(null)}>
						Close
					</Button>
					<Button variant="primary" onClick={() => handleSubmit()}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			}
		</>
	);
}

export default OutInventoryModal 