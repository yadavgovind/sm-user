import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getLotsDetailApi, getProductTypeApi, handleBlur, outInventoryApi } from './handler';

import { getRoomDetailApi } from '../../room/handler';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { getCustomerApi } from '../../customer/handler';
import SwitchSoldType from './SwitchSoldType';
const Inventory = () => {
	const [productType, setProductType] = useState([])
	const [lotsList, setLOtsList] = useState([])
	const [rooms, setRoom] = useState([])
	const [currentModal, openModal] = useState(null)
	const lotHeading = ['#', 'Room No', 'Lot Number', 'Customer Name', 'Total Quantity', 'Available Quantity', 'Product', '']
	const [showOption, toggleButton] = useState('')

	const [customerDetail, setCustomerDetail] = useState({})

	const [searchUser, setSearchUser] = useState('')
	const [supplier, setSupplier] = useState({})
	const [lotDetail, setLotDetail] = useState([])

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
		// if (payload.quantity && payload.reasonOfOut && payload.supplier) {
		if (payload.quantity && payload.reasonOfOut) {
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

	useEffect(() => {
		const storeId = sessionStorage.getItem('storeId').trim()
		getLotsDetailApi(storeId).then((res) => {
			console.log(">>>>res", res)
			setLOtsList(res)
		}).catch((err) => {
			console.log(err)
		})
		getProductTypeApi().then((res) => {
			setProductType(res)
		}).catch((err) => {
			console.log(err)
		})
		getRoomDetailApi(storeId).then((roomDetail) => {
			let roomArr = []
			roomDetail.map(item => roomArr.push(item.roomNo))
			setRoom(roomArr)
		}).catch(err => console.log(err))
	}, [])
	return (<>
		<h4>Lots In Detail</h4>

		<div className='white-bg'>
			<div className='example-table-container'>
				<div className='mb-2 mt-2' style={{
					height: 'auto',
					padding: '1px',
					overflow: 'hidden',
				}}>
					<div className='form-group me-3' style={{ float: 'right' }}>
						<input className='mat-input-element mat-form-field-autofill-control
									 form-control ng-untouched ng-pristine ng-valid cdk-text-field-autofill-monitored'
							style={{ height: '43px' }}
							placeholder='Search'
						/>
					</div>
				</div>
				<table className='mat-table cdk-table mat-sort example-table w-100'>
					<thead>
						<tr className='mat-header-row cdk-header-row'>
							{lotHeading.map(heading => {
								return (<th className='mat-header-cell cdk-header-cell cdk-column-checkbox mat-column-checkbox'>
									{heading}
								</th>
								)
							})}
						</tr>
					</thead>
					<tbody>
						{lotsList.length ? lotsList.map((item, i) => {
							return item.lotDetails.map((lot => {
								return (<tr className='mat-row cdk-row'>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{i + 1}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.roomNo}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.lotNo}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.customerName}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.totalQuantity}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.availableQuantity}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox' onClick={() => toggleButton('')}>{`${lot.productType}(${lot.productSize})`}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>
										<div className='btn-group dropleft' style={{ float: 'right' }}>
											<button className='mat-menu-trigger btn btn3bot' onClick={() => toggleButton(i)}>
												<i className='fas fa-ellipsis-v'>
												</i>
											</button>
										</div>
										{i === showOption && <div className='cdk-overlay-pane'>
											<div className='mat-menu-panel mat-elevation-z4'>
												<div className='mat-menu-content'>
													<div>
														<button className='mat-menu-item' onClick={() => {
															openModal("soldType")
															setCustomerDetail({ customerId: item.customerId, lotNo: lot.lotNo })
														}}>
															<i className="far fa-eye" style={{ marginRight: "10px" }}></i>View
														</button>
														<button className='mat-menu-item' onClick={() => {
															openModal("lot-detail")
															setLotDetail(lot)
														}}>
															<i className="" style={{ marginRight: "10px" }} ></i>Sold
														</button>
													</div>
												</div>
											</div>
										</div>}
									</td>
								</tr>)
							}))
						}) : ''}
					</tbody>
				</table>

			</div>
		</div>
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
		{currentModal === "soldType" &&
			<SwitchSoldType customerDetail={customerDetail} openModal={() => openModal(null)} />
		}
	</>);
}

export default Inventory;