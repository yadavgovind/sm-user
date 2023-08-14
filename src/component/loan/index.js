import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addLoanApi } from './handle';
import { toast } from "react-toastify";
function Loan({ currentModal, openModal, customerDetail }) {
	const [state, setState] = useState({
		amount: ''
	})
	const { amount, loanType } = state;

	const handleChange = (loanType) => {
		setState({ ...state, loanType })
	}

	const handleOnChange = (key, value) => {
		setState({ ...state, [key]: value })
	}

	const getPayload = () => {
		return {
			amount,
			loanType,
			customerId: customerDetail.id,
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
								<option>Full</option>
								<option>Partial</option>

							</Form.Control>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
							<Form.Label>Amount</Form.Label>
							<Form.Control
								type="text"
								name='amount'
								placeholder="amount"
								value={amount}
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