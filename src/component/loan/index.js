import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addLoanApi } from './handle';
import { toast } from "react-toastify";
function Loan({ currentModal, openModal, customerDetail }) {
	const [state, setState] = useState({
		amount: '',
		countOfPackets: '',
		amountPerPacket: '',
		loanType: 'packets',
		rateOfInterest: ''
	})
	const { amount, loanType, rateOfInterest, countOfPackets, amountPerPacket } = state;

	const handleChange = (loanType) => {
		if (loanType === 'amount') {

			setState({ loanType })
		} else {
			setState({ ...state, loanType })
		}
	}

	const handleOnChange = (key, value) => {
		setState({ ...state, [key]: value })
	}

	const getPayload = () => {
		return {
			amount: loanType === 'packets' ? (countOfPackets * amountPerPacket) : amount,
			loanType,
			customerId: customerDetail.id,
			rateOfInterest,
			countOfPackets,
			amountPerPacket,
			storeId: sessionStorage.getItem('storeId').trim()
		}
	}

	const handleSubmit = () => {
		const payload = getPayload()
		addLoanApi(payload).then(() => {
			openModal(null)
			setState({})
			toast.success("Loan added successfully")
		}).catch(err => {
			toast.error("Something went wrong.")
			openModal(null)
		})
	}
	console.log('state', state)
	return (
		<>
			{currentModal === "loan" && <Modal show onHide={() => openModal(null)}>
				<Modal.Header closeButton>
					<Modal.Title>Loan</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Loan Type</Form.Label>
							<Form.Control
								as="select"
								aria-label="Default select example"
								onChange={(e) => handleChange(e.target.value)}>
								<option value="packets">Packets</option>
								<option value="amount">Amount</option>

							</Form.Control>
						</Form.Group>
						{loanType === 'packets' && <>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
								<Form.Label>Count of Packets</Form.Label>
								<Form.Control
									type="text"
									name='countOfPackets'
									placeholder="Count Of Packets"
									value={countOfPackets}
									onChange={(e) => handleOnChange(e.target.name, e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
								<Form.Label>Amount per Packet</Form.Label>
								<Form.Control
									type="text"
									name='amountPerPacket'
									placeholder="Amount per Packet"
									value={amountPerPacket}
									onChange={(e) => handleOnChange(e.target.name, e.target.value)}
								/>
							</Form.Group>
						</>}
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
							<Form.Label>Amount</Form.Label>
							<Form.Control
								type="text"
								name='amount'
								placeholder="Amount"
								value={countOfPackets && amountPerPacket ? countOfPackets * amountPerPacket : amount}
								onChange={(e) => handleOnChange(e.target.name, e.target.value)}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
							<Form.Label>Rate of Interest</Form.Label>
							<Form.Control
								type="text"
								name='rateOfInterest'
								placeholder="Rate Of Interest"
								value={rateOfInterest}
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