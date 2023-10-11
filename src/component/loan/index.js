import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addLoanApi } from './handle';
import { toast } from "react-toastify";


const ValidationForAmountSchema = Yup.object().shape({
	amount: Yup.string().required('Please enter amount.'),
	rateOfInterest: Yup.string().required('Please enter rate of interest.'),
});


const ValidationForPacketsSchema = Yup.object().shape({
	countOfPackets: Yup.string().required('Please enter count of packets.'),
	amountPerPacket: Yup.string().required('Please enter amount of packets'),
	rateOfInterest: Yup.string().required('Please enter rate of interest.'),
});

function Loan({ openModal, customerDetail }) {
	const [formikObj, setFormikProps] = useState(null);
	const [state, setState] = useState({
		loanType: 'packets',
	})
	const { loanType } = state;

	const handleChange = (loanType) => {
		if (loanType === 'amount') {

			setState({ loanType })
		} else {
			setState({ ...state, loanType })
		}
	}

	// const handleOnChange = (key, value) => {
	// 	setState({ ...state, [key]: value })
	// }

	const getPayload = (values) => {
		if (loanType === 'packets') {
			return {
				amount: values.countOfPackets * values.amountPerPacket,
				loanType,
				customerId: customerDetail.id,
				rateOfInterest: values.rateOfInterest,
				countOfPackets: values.countOfPackets,
				amountPerPacket: values.amountPerPacket,
				storeId: sessionStorage.getItem('storeId').trim()
			}
		} else {
			return {
				amount: values.amount,
				loanType,
				customerId: customerDetail.id,
				rateOfInterest: values.rateOfInterest,
				storeId: sessionStorage.getItem('storeId').trim()
			}
		}

	}

	const handleSubmit = (values) => {
		const payload = getPayload(values)
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
			{<Modal show onHide={() => openModal(null)}>
				<Modal.Header closeButton>
					<Modal.Title>Loan</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Formik
						validationSchema={loanType === 'packets' ? ValidationForPacketsSchema : ValidationForAmountSchema}
						initialValues={{
							amount: '',
							countOfPackets: '',
							amountPerPacket: '',
							loanType: 'packets',
							rateOfInterest: ''
						}}
						onSubmit={(values) => handleSubmit(values)}
					>{({ errors, touched, ...formikProps }) => {
						if (!formikObj) {
							setFormikProps(formikProps);
						}
						return (
							<FormikForm >
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
											value={formikProps.values.countOfPackets}
											onChange={formikProps.handleChange}
											onBlur={formikProps.handleBlur}
										/>
										{errors.countOfPackets && touched.countOfPackets && <span className="error">{errors.countOfPackets}</span>}
									</Form.Group>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
										<Form.Label>Amount per Packet</Form.Label>
										<Form.Control
											type="text"
											name='amountPerPacket'
											placeholder="Amount per Packet"
											value={formikProps.values.amountPerPacket}
											onChange={formikProps.handleChange}
											onBlur={formikProps.handleBlur}
										/>
										{errors.amountPerPacket && touched.amountPerPacket && <span className="error">{errors.amountPerPacket}</span>}
									</Form.Group>
								</>}
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
									<Form.Label>Amount</Form.Label>
									<Form.Control
										type="text"
										name='amount'
										placeholder="Amount"
										value={formikProps.values.countOfPackets && formikProps.values.amountPerPacket ? formikProps.values.countOfPackets * formikProps.values.amountPerPacket : formikProps.values.amount}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
									/>
									{errors.amount && touched.amount && <span className="error">{errors.amount}</span>}
								</Form.Group>

								<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
									<Form.Label>Rate of Interest</Form.Label>
									<Form.Control
										type="text"
										name='rateOfInterest'
										placeholder="Rate Of Interest"
										value={formikProps.values.rateOfInterest}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
									/>
									{errors.rateOfInterest && touched.rateOfInterest && <span className="error">{errors.rateOfInterest}</span>}
								</Form.Group>
							</FormikForm>
						)
					}}
					</Formik>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => openModal(null)}>
						Close
					</Button>
					{formikObj && <Button variant="primary" onClick={formikObj.submitForm}>
						Save
					</Button>}
				</Modal.Footer>
			</Modal>
			}

		</>
	);
}

export default Loan