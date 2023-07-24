import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { getLotsDetailApi, handleBlur } from '../inInventory/handler';
import { getSupplier, outInventoryApi } from './handler';
import { toast } from 'react-toastify';
import { getCustomerApi } from '../../customer/handler';
const OutInventory = () => {
	const [searchUser, setSearchUser] = useState('')
	const [supplier, setSupplier] = useState({})
	const [lotsList, setLOtsList] = useState([])
	const [lotDetail, setLotDetail] = useState({})
	const [currentModal, openModal] = useState(null)
	const [state, setState] = useState({})

	useEffect(() => {
		const storeId = sessionStorage.getItem('storeId').trim()
		console.log('searchUser', searchUser)
		getLotsDetailApi(storeId, searchUser).then((res) => {
			console.log(">>>>res", res)
			setLOtsList(res)
		}).catch((err) => {
			console.log(err)
		})
		getCustomerApi(storeId)
			.then((customerList) => {
				let arr = []
				customerList.forEach(item => {
					if (item.roleType === 'supplier') {
						arr.push(item)
					}
				})
				setSupplier(arr)
			}).catch(err => console.log(err))
	}, [searchUser])
	const handleLotClick = (detail, modal) => {
		setLotDetail(detail)
		modal === 'view-detail' ? openModal('view-detail') : openModal('lot-detail')
	}
	const getPayload = () => {
		let itemDetails = []
		Object.keys(state).forEach(key => {
			if (state[key] && key !== 'reasonOfOut') {
				itemDetails.push({
					itemId: key,
					weight: state[key]
				})
			}
		})
		const payload = {
			itemIds: [...itemDetails],
			customerId: lotDetail.customerId,
			lotNo: lotDetail.lotNo,
			quantity: itemDetails.length,
			reasonOfOut: state.reasonOfOut,
			soldBusinessManId: supplier
		}
		return payload
	}
	const handleSubmit = () => {
		const payload = getPayload()
		if (payload.quantity && payload.reasonOfOut && payload.supplier) {
			outInventoryApi(payload).then(() => {
				openModal(null)
				setState({})
				toast.success("Inventory out successfully")
			}).catch(err => toast.error((err && err.message) || 'Something went wrong.'))
		} else {
			toast.error('Please fill required fields.')
		}



	}
	const handleOnBlur = (itemId, value) => {
		setState({ ...state, [itemId]: value })
	}
	return (<><div>
		<h1>Out Inventory</h1>
	</div>
		<div className="input-group w-25 float-end">
			<input
				type="search"
				className="form-control rounded"
				placeholder="Search Customer"
				aria-label="Search"
				name="search"
				maxLength={10}
				onBlur={(e) => setSearchUser(e.target.value)}
				aria-describedby="search-addon" />
			<button type="button" className="btn btn-primary">
				<i className='fas fa-search'></i></button>
		</div>

		<h4>Lots Detail</h4>
		<Table striped="columns" bordered>
			<thead>
				<tr>
					<th>S.No</th>
					<th>Customer Name</th>
					<th>Lot Number</th>
					<th>Available Quantity</th>
					<th>Sold Out Quantity</th>
					<th>Product</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{lotsList.length ? lotsList.map((item, i) => {
					return item.lotDetails.map(((lot, i) => {
						let soldOutQuantity = 0
						lot.itemDetails.forEach(detail => {
							if (detail.productOutId !== 'null') {
								soldOutQuantity = soldOutQuantity + 1
							}
						})
						return (<tr>
							<td>{i + 1}</td>
							<td>{item.customerName}</td>
							<td onClick={() => handleLotClick({ ...lot, customerId: item.customerId })} style={{ cursor: 'pointer' }}>{lot.lotNo}</td>
							<td>{lot.itemDetails.length - soldOutQuantity}</td>
							<td>{soldOutQuantity}</td>
							<td>{`${lot.productType}(${lot.productSize})`}</td>
							<td>
								<Button variant="secondary" onClick={() => handleLotClick({ ...lot, customerId: item.customerId }, 'view-detail')}>View</Button> {'   '}
								<Button variant="danger" onClick={() => handleLotClick({ ...lot, customerId: item.customerId })}>Sold Out</Button>
							</td>
						</tr>)
					}))
				}) : ''}
			</tbody>
		</Table>
		{currentModal === "lot-detail" && <Modal show onHide={() => openModal(null)}>
			<Modal.Header closeButton>
				<Modal.Title>Item in Lots</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Table striped="columns" bordered>
					<thead>
						<tr>
							<th>Item No</th>
							<th>Product In Id</th>
							<th>Product Out Id</th>
							<th>Weight</th>

						</tr>
					</thead>
					<tbody>
						{lotDetail.itemDetails.map((item, i) => {
							return (<tr>
								<td>{item.itemNo}</td>
								<th>{item.productInId || ''}</th>
								<td>{item.productOutId === 'null' ? '' : item.productOutId}</td>
								<td>
									<input type='number' name={`weight${item.id}`} value={item.weight}
										disabled={item.weight}
										onBlur={(e) => handleOnBlur(item.id, e.target.value)} />
								</td>
							</tr>)
						})}
					</tbody>
				</Table>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
					<Form.Label>Sold Out Supplier</Form.Label>
					<Form.Control
						as="select"
						aria-label="Default select example"
						onChange={(e) => handleBlur(e.target.value)}>
						<option>Select Supplier</option>
						{/* {getRooms()} */}
					</Form.Control>
				</Form.Group>

				<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
					<Form.Label>Reason of out</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter reason"
						name="reasonOfOut"
						onBlur={(e) => handleOnBlur(e.target.name, e.target.value)}
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => openModal(null)}>
					Close
				</Button>
				<Button variant="primary" onClick={() => handleSubmit()}>
					Sold Out
				</Button>
			</Modal.Footer>
		</Modal>
		}
		{currentModal === "view-detail" && <Modal show onHide={() => openModal(null)}>
			<Modal.Header closeButton>
				<Modal.Title>Item in Lots</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Table striped="columns" bordered>
					<thead>
						<tr>
							<th>Item No</th>
							<th>Product In Id</th>
							<th>Product Out Id</th>
							<th>Weight</th>

						</tr>
					</thead>
					<tbody>
						{lotDetail.itemDetails.map((item, i) => {
							return (<tr>
								<td>{item.itemNo}</td>
								<th>{item.productInId || ''}</th>
								<td>{item.productOutId === 'null' ? '' : item.productOutId}</td>
								<td>
									{item.weight}
								</td>
							</tr>)
						})}
					</tbody>
				</Table>
			</Modal.Body>
		</Modal>
		}
	</>);
}

export default OutInventory;