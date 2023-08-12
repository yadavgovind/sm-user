import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Loan({ productType, roomsArr, currentModal, openModal }) {
	const [lotsOption, setLotOption] = useState([]);
	const [availableQuantity, setAvailableQuantity] = useState(0);
	const [lotArr, setLotsArr] = useState([]);
	const [maxQuantityError, setMaxQuantityError] = useState(false)

	const [state, setState] = useState({
		firstName: '',
		email: '',
		roomNo: '',
		lotNo: '',
		productId: '',
		quantity: '',
		currentQuantity: '',
		productInDate: new Date()
	})
	const { quantity } = state;


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
			return options.push(<option key={item.productId} value={item.productId}>{item.productType}{' '}{item.productSize}</option>)

		})
		return options
	}

	const handleChange = (roomNo) => {
		setState({ ...state, roomNo })
		getAvailableLots(roomNo)

	}
	const getAvailableLots = (roomNo) => {
		// const storeId = sessionStorage.getItem('storeId')
		// getAvailableLotsApi(roomNo, storeId.trim()).then((res) => {
		// 	getAvailableLotsOption(res)
		// 	setLotsArr(res)
		// }).catch(err => console.log(err))

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

	const getPayload = (state) => {
		let payload = {
			customerId: state.id || '',
			currentQuantity: state.currentQuantity,
			lotNo: state.lotNo,
			productId: state.productId,
			roomNo: state.roomNo,
			quantity: state.quantity,
			storeId: sessionStorage.getItem('storeId').trim(),
			session: ''
		}
		return payload
	}
	const handleSubmit = () => {
		// const payload = getPayload(state)
		// if (!state.lotNo || !state.productId || !state.quantity || !state.roomNo) {
		// 	toast.error('Please fill the required fields.')
		// } else {
		// 	!maxQuantityError && addInventoryApi(payload).then(() => {
		// 		openModal(null)
		// 		setState({})
		// 		toast.success("Inventory added successfully")
		// 	}).catch(err => toast.error((err && err.message) || 'Something went wrong.'))
		// }

	}
	return (
		<>
			{currentModal === "loan" && <Modal show onHide={() => openModal(null)}>
				<Modal.Header closeButton>
					<Modal.Title>Loan</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Room</Form.Label>
							<Form.Control
								as="select"
								aria-label="Default select example"
								onChange={(e) => handleChange(e.target.value)}>
								<option>Select</option>
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
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Sold Type</Form.Label>
							<Form.Control
								as="select"
								aria-label="Default select example"
								onChange={(e) => handleChange(e.target.value)}>
								<option>Full</option>
								<option>Partial</option>

							</Form.Control>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
							<Form.Label>Sold Count</Form.Label>
							<Form.Control
								type="number"
								name='count'
								placeholder="Count"
								value={quantity}
								max={availableQuantity}
								onChange={(e) => handleOnChange(e.target.name, e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
							<Form.Label>Sales Man</Form.Label>
							<Form.Control
								type="text"
								name='saleMan'
								placeholder="Sales Man"
								value={quantity}
								max={availableQuantity}
								onChange={(e) => handleOnChange(e.target.name, e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
							<Form.Label>Reason of Out</Form.Label>
							<Form.Control
								type="text"
								name='reason'
								placeholder="Reason"
								value={quantity}
								max={availableQuantity}
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
						Save
					</Button>
				</Modal.Footer>
			</Modal>
			}

		</>
	);
}

export default Loan