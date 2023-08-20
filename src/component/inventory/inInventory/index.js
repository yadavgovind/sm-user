import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getLotsDetailApi, getSuppliersApi, outInventoryApi } from './handler';


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import SwitchSoldType from './SwitchSoldType';
import TableView from '../../common/TableView';
import NavbarHoc from '../../common/NavbarHoc';
const Inventory = () => {
	const [lotsList, setLOtsList] = useState([])
	const [currentModal, openModal] = useState(null)
	const lotHeading = ['#', 'Room No', 'Lot Number', 'Customer Name', 'Total Quantity', 'Available Quantity', 'Product', '']
	const [showOption, toggleButton] = useState('')
	const [customerDetail, setCustomerDetail] = useState({})
	// const [searchUser, setSearchUser] = useState('')
	const [supplier, setSupplier] = useState({})
	const [lotDetail, setLotDetail] = useState([])
	const [state, setState] = useState({})
	const [supplierId, setSupplierId] = useState('')

	const customerId = sessionStorage.getItem('customerId')

	const getLots = () => {
		const storeId = sessionStorage.getItem('storeId').trim()
		getLotsDetailApi(storeId, customerId).then((res) => {
			let lot = res.find(item => item.customerId === Number(customerId))
			lot && setLOtsList([lot])
		}).catch((err) => {
			console.log(err)
		})
	}

	useEffect(() => {
		getLots()
	}, [])
	useEffect(() => {
		const storeId = sessionStorage.getItem('storeId').trim()
		getSuppliersApi(storeId).then((res) => {
			setSupplier(res)
		}).catch(err => console.log(err))
	}, [])

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
			customerId: customerDetail.customerId,
			lotNo: lotDetail.lotNo,
			quantity: itemDetails.length,
			reasonOfOut: state.reasonOfOut,
			soldBusinessManId: supplierId
		}
		return payload
	}
	const handleSubmit = () => {
		const payload = getPayload()
		// if (payload.quantity && payload.reasonOfOut && payload.supplier) {
		if (payload.quantity && payload.reasonOfOut) {
			outInventoryApi(payload).then(() => {
				getLots()
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


	const getSupplier = () => {
		let options = []
		supplier.length && supplier.map((item, i) => {
			return options.push(<option key={i} value={item.id}>{item.firstName}</option>)
		})
		return options
	}

	return (<>
		<h4>Lots</h4>
		<NavbarHoc
			navbarArr={[
				{ link: '/store', name: 'Dashboard' },
				{ link: '/store#customer', name: 'Customer' },
				{ link: '/store#in-inventory', name: 'Lot' },

			]}
			TableView={() => <TableView
				theading={lotHeading}
				showBackButton={true}
				backUrl={'#customer'}
				TableData={() => {
					return lotsList.length ? lotsList.map((item, i) => {
						return item.lotDetails.map((lot => {
							return (<tr className='mat-row cdk-row' key={i}>
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
														setCustomerDetail({ customerId: item.customerId })
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
					}) : ''

				}}
			/>}
		/>
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
						onChange={(e) => setSupplierId(e.target.value)}>
						<option>Select Supplier</option>
						{getSupplier()}
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
