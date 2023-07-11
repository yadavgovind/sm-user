import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addInventoryApi, getAvailableLotsApi, handleBlur } from './handler';
import { toast } from 'react-toastify';

function AddInventoryModal({ productType, roomsArr }) {
	const [currentModal, openModal] = useState(null);
	const [lotsOption, setLotOption] = useState([]);
	const [availableQuantity, setAvailableQuantity] = useState(0);
	const [lotArr, setLotsArr] = useState([]);
	const [maxQuantityError, setMaxQuantityError] = useState(false)


	const [state, setState] = useState({
		firstName: '',
		email: '',
		roomNo: '',
		lotNo: '',
		product_type: '',
		quantity: '',
		currentQuantity: '',
		productInDate: new Date()
	})
	const { firstName, email, quantity } = state;


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

	const handleChange = (roomNo) => {
		setState({ ...state, roomNo })
		getAvailableLots(roomNo)

	}
	const getAvailableLots = (roomNo) => {
		const storeId = sessionStorage.getItem('storeId')
		getAvailableLotsApi(roomNo, storeId.trim()).then((res) => {
			getAvailableLotsOption(res)
			setLotsArr(res)
		}).catch(err => console.log(err))

	}
	const getAvailableLotsOption = (lots) => {
		let options = []
		lots.length && lots.map(item => {
			const label = item.generatedLotName.split('S')[0]
			const currentCapacity = `currentLotCapacity: ${item.currentLotCapacity}`
			return options.push(<option value={item.generatedLotName}>{label}{' '}{currentCapacity}</option>)

		})
		setLotOption(options)
		return options
	}
	const handleOnChangeLot = (lotNo) => {
		const selectedLot = lotArr.find(item => item.generatedLotName === lotNo)
		setAvailableQuantity(selectedLot.currentLotCapacity)
		setState({ ...state, lotNo, currentQuantity: selectedLot.currentLotCapacity })
	}
	const handleOnChange = (key, value) => {
		if (key === 'quantity' && (value > (availableQuantity) || value <= 0)) {
			setMaxQuantityError(true)
		} else {
			setState({ ...state, [key]: value })
			setMaxQuantityError(false)
		}
	}
	const handleSubmit = () => {
		addInventoryApi(state).then(() => {
			openModal(null)
			toast.success("Inventory added successfully")
		}).catch(err => toast.error(err && err.message || 'Something went wrong.'))
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
								type="text"
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
								disabled
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name='email'
								value={email}
								disabled
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Room</Form.Label>
							<Form.Control
								as="select"
								aria-label="Default select example"
								onChange={(e) => handleChange(e.target.value)}>
								<option>Select Room</option>
								{getRooms()}
							</Form.Control>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
							<Form.Label>Lots</Form.Label>
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
								value={quantity}
								max={availableQuantity}
								onChange={(e) => handleOnChange(e.target.name, e.target.value)}
							/>
							{maxQuantityError && <span style={{ color: 'red' }}>Please enter quantity less than or equal to {availableQuantity}</span>}
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
							<Form.Label>Product</Form.Label>
							<Form.Control
								as="select"
								name="product_type"
								aria-label="Default select example"
								onChange={(e) => handleOnChange(e.target.name, e.target.value)}
							>
								<option>Select Product Type</option>
								{getProductTpyes()}

							</Form.Control>
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
			</Modal>}
		</>
	);
}

export default AddInventoryModal 