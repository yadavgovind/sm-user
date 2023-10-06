import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { addCustomerApi } from './handler';
import { tokenDecode } from '../../constant/api';

const ValidationSchema = Yup.object().shape({
	firstName: Yup.string().required('Please enter user name.'),
	email: Yup.string().required('Please enter email.'),
	phone: Yup.string().required('Please enter phone number'),
	address: Yup.string().required('Please enter address.'),
	vehicleNumber: Yup.string().required('Please enter user vehicle number.'),
	roleType: Yup.string().required('Please select user role type.'),
});
function AddCustomer() {
	// const [isSubmitting, setIsSubmitting] = useState(false);
	const [formikObj, setFormikProps] = useState(null);
	const [show, setShow] = useState(false);
	// const [state, setState] = useState({})

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true)
	};


	// const handleOnChange = (e) => {
	// 	const name = e.target.name;
	// 	const value = e.target.value;
	// 	setState({ ...state, [name]: value })
	// }

	const handleSubmit = async (values) => {
		let detail = tokenDecode()
		const payload = { ...values, 'storeId': detail.storeId }
		addCustomerApi(payload, sessionStorage.getItem('token')).then((res) => {
			setShow(false)
			// setIsSubmitting(false);
		}).catch((err) => {
			toast.error(err.message)
			setShow(false)
			// setIsSubmitting(false);
		})

	}
	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				<i className="fa-solid fa-plus"></i> Add User
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Formik
						validationSchema={ValidationSchema}
						initialValues={{
							firstName: '',
							email: '',
							phone: '',
							address: '',
							vehicleNumber: '',
							roleType: ''
						}}
						onSubmit={(values) => handleSubmit(values)}
					>{({ errors, touched, ...formikProps }) => {
						if (!formikObj) {
							setFormikProps(formikProps);
						}
						return (
							<FormikForm >
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label>User Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter full name"
										name="firstName"
										value={formikProps.values.firstName}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
									/>
									{errors.firstName && touched.firstName && <span className="error">{errors.firstName}</span>}
								</Form.Group>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label> Phone number</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter phone number"
										name="phone"
										maxLength={10}
										value={formikProps.values.phone}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
									/>
									{errors.phone && touched.phone && <span className="error">{errors.phone}</span>}
								</Form.Group>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										name="email"
										value={formikProps.values.email}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
									/>
									{errors.email && touched.email && <span className="error">{errors.email}</span>}
								</Form.Group>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
									<Form.Label>Vehicle number</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter vehicle number"
										name="vehicleNumber"
										value={formikProps.values.vehicleNumber}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
									/>
									{errors.vehicleNumber && touched.vehicleNumber && <span className="error">{errors.vehicleNumber}</span>}
								</Form.Group>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
									<Form.Label>Address</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter address"
										name="address"
										value={formikProps.values.address}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
									/>
									{errors.address && touched.address && <span className="error">{errors.address}</span>}
								</Form.Group>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
									<Form.Label>Role type</Form.Label>
									<Form.Control
										as="select"
										name="roleType"
										aria-label="Default select example"
										value={formikProps.values.roleType}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
									>
										<option value=''>Select User Role</option>
										<option value='customer'>Customer</option>
										<option value='supplier'>Supplier</option>
									</Form.Control>
									{errors.roleType && touched.roleType && <span className="error">{errors.roleType}</span>}
								</Form.Group>
							</FormikForm>
						)
					}}
					</Formik>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					{formikObj && <Button variant="primary"
						// disabled={isSubmitting}
						onClick={formikObj.submitForm}>
						Save Changes
					</Button>}
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default AddCustomer