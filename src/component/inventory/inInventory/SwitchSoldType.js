import { useState } from "react";
import Switch from "react-switch";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { soldScheduleApi } from "./handler";

export default function SwitchSoldType({ openModal, customerDetail }) {
	const [state, setState] = useState({ checked: true })

 
	const handleChange = (checked, value) => {
		if (checked === 'soldQuantity') {
			setState({ ...state, 'soldQuantity': value })
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
			soldQuantity:state.checked ? customerDetail.availableQuantity: state.soldQuantity,
		}).then((res) => {
			console.log(">>>>res", res)
			openModal(null)
		}).catch((err) => {
			console.log(err)
		})
	}
	return (
		<Modal show onHide={openModal}>
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
				{!state.checked && <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
					<Form.Label>Sold Quantity</Form.Label>
					<Form.Control
						type="number"
						placeholder="Quantity"
						name="soldQuantity"
						onChange={(e) => handleChange(e.target.name, e.target.value)}

					/>
				</Form.Group>}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => openModal(null)}>
					Close
				</Button>
				<Button variant="primary" onClick={() => handleSubmit()}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	)

}
