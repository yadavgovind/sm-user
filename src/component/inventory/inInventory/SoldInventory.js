import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import { outInventoryApi } from './handler';
import './index.css'
const SoldInventory = () => {
	const [state, setState] = useState({})

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
			soldBusinessManId: sessionStorage.getItem('soldBusinessManId'),
			storeId
		}
		return payload
	}
	const handleSubmit = () => {
		const payload = getPayload()
		if (payload.quantity) {
			outInventoryApi(payload).then(() => {
				// setState({})
				toast.success("Inventory out successfully")

			}).catch(err => toast.error((err && err.message) || 'Something went wrong.'))
		} else {
			toast.error('Please fill required fields.')
		}
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