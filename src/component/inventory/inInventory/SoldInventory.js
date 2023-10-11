import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import { getSuppliersApi, outInventoryApi } from './handler';
import './index.css'
const SoldInventory = () => {
	const [state, setState] = useState({})
	const [supplier, setSupplier] = useState({})
	const [supplierId, setSupplierId] = useState('')

	const handleSelect = (value) => {
		setSupplierId(value)
	}
	const storeId = sessionStorage.getItem('storeId').trim()

	const lotDetail = JSON.parse(sessionStorage.getItem('lotDetail'))
	const itemDetail = lotDetail.filter(item => item.itemNo)
	const lot = lotDetail.filter(item => item.lotNo)

	const handleOnBlur = (itemId, value) => {
		setState({ ...state, [itemId]: value })
	}

	const getPayload = () => {
		let itemDetails = []
		Object.keys(state).forEach(key => {
			if (state[key]) {
				itemDetails.push({
					itemId: key,
					weight: state[key]
				})
			}
		})
		const payload = {
			itemIds: [...itemDetails],
			customerId: sessionStorage.getItem('customerId'),
			lotNo: lot[0].lotNo,
			quantity: itemDetails.length,
			soldBussinessManId: supplierId,
			storeId
		}
		return payload
	}
	const handleSubmit = () => {
		const payload = getPayload()
		if (payload.quantity && supplierId) {
			outInventoryApi(payload).then(() => {
				setState({})
				toast.success("Inventory out successfully")

			}).catch(err => toast.error((err && err.message) || 'Something went wrong.'))
		} else {
			toast.error('Please fill required fields.')
		}
	}
	useEffect(() => {
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
	return (<div className="row">
		<div className="col-sm-12">
			<div className="cp-rightsection">
				<div className="right-section-tab">
					<div className="right-nav" id="stpperCall">
						<nav className="navbar navbar-expand-lg navbar-light mb-1">
							<div className="nav_inner">
								<div className="collapse navbar-collapse common-stepper">
									<ul className="navbar-nav">
										<li
											className="nav-item">
											<a
												href={'/store/dashboard'}
												className="nav-link">
												<span className="common-stepper-counter">{1}</span>
												<span>
													{'Dashboard'}
												</span>
											</a>
										</li>
										<li
											className="nav-item">
											<a
												href={'/store/customer'}
												className="nav-link">
												<span className="common-stepper-counter">{2}</span>
												<span>
													{'Customer'}
												</span>
											</a>
										</li>
										<li
											className="nav-item">
											<a
												href={'/store/in-inventory'}
												className="nav-link">
												<span className="common-stepper-counter">{3}</span>
												<span>
													{'Lot'}
												</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</nav>
					</div>
				</div>
				<div className='white-bg'>
					<div className='example-table-container mgn-25'>
						<Form.Group className="mb-3" >
							<Form.Label>Weight</Form.Label>
							<div style={{ display: 'flex', flexWrap: 'wrap' }}>
								{itemDetail?.map((item, i) => {
									return (
										<div className='main-wgt'>
											<div className='child-wgt'>{item.itemNo}</div>
											<div><input type='number' className='weight-input' name={`weight${item.id}`} value={item.weight}
												disabled={item.weight}
												onBlur={(e) => handleOnBlur(item.id, e.target.value)} />
											</div>
										</div>
									)
								})}
							</div>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
							<Form.Label>Sold Out Supplier<span style={{ color: 'red' }}>*</span></Form.Label>
							<Form.Control
								as="select"
								aria-label="Default select example"
								onChange={(e) => handleSelect(e.target.value)}>
								<option>Select Supplier</option>
								{getSupplier()}
							</Form.Control>
						</Form.Group>
						<Button variant="primary" onClick={() => handleSubmit()}>
							Sold Out
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>);
}


export default SoldInventory;