import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { getLotsDetailApi } from '../inInventory/handler';
import { getSupplier, outInventoryApi } from './handler';
import { toast } from 'react-toastify';
const OutInventory = () => {
	const [supplier, setSupplier] = useState({})
	const [lotsList, setLOtsList] = useState([])
	const [lotDetail, setLotDetail] = useState({})
	const [currentModal, openModal] = useState(null);
	const [state, setState] = useState({})
	useEffect(() => {
		const storeId = sessionStorage.getItem('storeId').trim()
		getLotsDetailApi(storeId).then((res) => {
			console.log(">>>>res", res)
			setLOtsList(res)
		}).catch((err) => {
			console.log(err)
		})
	}, [])
	const handleLotClick = (detail) => {
		setLotDetail(detail)
		openModal('lot-detail')
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
			supplier
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
	console.log('state', state)
	return (<><div>
		<h1>Out Inventory</h1>
	</div>
		<div className="input-group w-25 float-end">
			<input
				type="search"
				className="form-control rounded"
				placeholder="Search Customer"
				aria-label="Search"
				aria-describedby="search-addon" />
			<button type="button" className="btn btn-primary">
				<i className='fas fa-search'></i></button>
		</div>

		<h4>Lots Detail</h4>
		<Table striped="columns" bordered>
			<thead>
				<tr>
					<th>S.No</th>
					<th>Customer ID</th>
					<th>Lot Number</th>
					<th>Available Quantity</th>
					<th>Sold Out Quantity</th>
					<th>Product</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{lotsList.length ? lotsList.map((item, i) => {
					return item.lotDetails.map((lot => {
						let soldOutQuantity = 0
						lot.itemDetails.forEach(detail => {
							if (detail.productOutId !== 'null') {
								soldOutQuantity = soldOutQuantity + 1
							}
						})
						return (<tr>
							<td>{i + 1}</td>
							<td>{item.customerId}</td>
							<td onClick={() => handleLotClick({ ...lot, customerId: item.customerId })} style={{ cursor: 'pointer' }}>{lot.lotNo}</td>
							<td>{lot.itemDetails.length - soldOutQuantity}</td>
							<td>{soldOutQuantity}</td>
							<td>{`${lot.productType}(${lot.productSize})`}</td>
							<td>
								<Button variant="secondary" onClick={() => openModal('view-detail')}>View</Button> {'   '}
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
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Sold Out Supplier</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter supplier phone number"
						name="supplier"
						onBlur={(e) => getSupplier(e.target.value, setSupplier)}
						autoFocus
					/>
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