import { useEffect, useState } from "react";
import Switch from "react-switch";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getSuppliersApi, soldScheduleApi } from "./handler";

export default function SwitchSoldType({ closeModal, customerDetail }) {
	const [state, setState] = useState({ checked: true })
	const [supplier, setSupplier] = useState({})

	const handleChange = (checked, value) => {
		if (checked === 'soldQuantity' || checked === 'amount' || checked === 'soldBussinessManId') {
			setState({ ...state, [checked]: value })
		} else {
			setState({ ...state, checked })
		}
	}
	const handleSubmit = (checked) => {
		soldScheduleApi({
			customerId: customerDetail.customerId,
			lotNo: customerDetail.lotNo,
			storeId: sessionStorage.getItem('storeId').trim(),
			soldType: state.checked ? 'Full' : 'Partial',
			soldQuantity: state.checked ? customerDetail.availableQuantity : state.soldQuantity,
			amount: state.amount,
			supplierId: state.soldBussinessManId
		}).then((res) => {
			closeModal()
		}).catch((err) => {
			console.log(err)
		})
	}
	useEffect(() => {
		const storeId = sessionStorage.getItem('storeId').trim()
		getSuppliersApi(storeId).then((res) => {
			setSupplier(res)
		}).catch(err => console.log(err))
	}, [])

	const getSupplier = () => {
		let options = []
		supplier.length && supplier.map((item, i) => {
			return options.push(<option key={i} value={item.id}>{item.firstName}</option>)
		})
		return options
	}
	return (
		<Modal show onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>Sold Type</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<label htmlFor="small-radius-switch">
					<Switch
						checked={state.checked}
						onChange={handleChange}
						handleDiameter={20}
						// offColor="#08f"
						onColor="#4477C5"
						// offHandleColor="#0ff"
						// onHandleColor="#08f"
						height={40}
						width={80}
						borderRadius={6}
						activeBoxShadow="0px 0px 1px 2px #ffff"
						uncheckedIcon={
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
									fontSize: 15,
									paddingRight: 2
								}}
							>
								Partial
							</div>
						}
						checkedIcon={
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
									fontSize: 15,
									paddingRight: 2
								}}
							>
								Full
							</div>

						}

						uncheckedHandleIcon={
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
									fontSize: 20
								}}
							>

							</div>
						}
						checkedHandleIcon={
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "100%",
									color: "red",
									fontSize: 18
								}}
							>

							</div>
						}
						className="react-switch"
						id="small-radius-switch"
					/>
				</label>
				{!state.checked && <><Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
					<Form.Label>Sold Quantity</Form.Label>
					<Form.Control
						type="number"
						placeholder="Quantity"
						name="soldQuantity"
						onChange={(e) => handleChange(e.target.name, e.target.value)}

					/>
				</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
						<Form.Label>Amount</Form.Label>
						<Form.Control
							type="number"
							placeholder="Amount"
							name="amount"
							onChange={(e) => handleChange(e.target.name, e.target.value)}

						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
						<Form.Label>Sold Out Supplier</Form.Label>
						<Form.Control
							as="select"
							aria-label="Default select example"
							onChange={(e) => handleChange('soldBussinessManId', e.target.value)}>
							<option>Select Supplier</option>
							{getSupplier()}
						</Form.Control>
					</Form.Group>
				</>
				}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => closeModal(null)}>
					Close
				</Button>
				<Button variant="primary" onClick={() => handleSubmit()}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	)

}
