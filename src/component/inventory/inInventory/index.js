import React, { useEffect, useState } from 'react';
import { getLotsDetailApi, getSuppliersApi, outInventoryApi } from './handler';


import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import SwitchSoldType from './SwitchSoldType';
import TableView from '../../common/TableView';
import NavbarHoc from '../../common/NavbarHoc';
import { useNavigate } from "react-router-dom";

const Inventory = () => {
	const [lotsList, setLOtsList] = useState([])
	const [currentModal, openModal] = useState(null)
	const lotHeading = ['supplier', 'Room No', 'Lot Number', 'Customer Name', 'Total Quantity', 'Available Quantity', 'status', 'Product', '']
	const [showOption, toggleButton] = useState('')
	const [customerDetail, setCustomerDetail] = useState({})
	// const [searchUser, setSearchUser] = useState('')
	const [supplier, setSupplier] = useState({})
	const [lotDetail, setLotDetail] = useState([])
	const [state, setState] = useState({})

	const navigate = useNavigate();
	const customerId = sessionStorage.getItem('customerId')
	const storeId = sessionStorage.getItem('storeId').trim()
	const getLots = () => {
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
		getSuppliersApi(storeId).then((res) => {
			setSupplier(res)
		}).catch(err => console.log(err))
	}, [])

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
			customerId: customerDetail.customerId,
			lotNo: lotDetail.lotNo,
			quantity: itemDetails.length,
			storeId
		}
		return payload
	}
	const handleSubmit = () => {
		const payload = getPayload()
		// if (payload.quantity && payload.reasonOfOut && payload.supplier) {
		if (payload.quantity) {
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

	return (<>
		<h4>Lots</h4>
		<NavbarHoc
			navbarArr={[
				{ link: '/store/dashboard', name: 'Dashboard' },
				{ link: '/store/customer', name: 'Customer' },
				{ link: '/store/in-inventory', name: 'Lot' },

			]}
			showBackButton={true}
			backUrl={'/store/customer'}

			TableView={() => <TableView
				theading={lotHeading}
				TableData={() => {
					return lotsList.length ? lotsList.map((item, i) => {
						return item.lotDetails.map(((lot, index) => {
							const roomNo = lot.lotNo?.split('-')[1]
							return (<tr className='mat-row cdk-row' key={i}>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.soldBossinessManName || '-'}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{roomNo || '-'}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.lotNo}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.customerName}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.totalQuantity}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.availableQuantity}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.lotStatus}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox' onClick={() => toggleButton('')}>{`${lot.productType}(${lot.productSize})`}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>
									<div className='btn-group dropleft' style={{ float: 'right' }}>
										<button className='mat-menu-trigger btn btn3bot' onClick={() => toggleButton(index)}>
											<i className='fas fa-ellipsis-v'>
											</i>
										</button>
									</div>
									{index === showOption && <div className='cdk-overlay-pane'>
										<div className='mat-menu-panel mat-elevation-z4'>
											<div className='mat-menu-content'>
												<div>
													{lot.availableQuantity ? <button className='mat-menu-item' onClick={() => {
														openModal("soldType")
														setCustomerDetail({ customerId: item.customerId, ...lot })
													}}>
														<i className="far fa-pencil" style={{ marginRight: "10px" }}></i>Sold Schedule
													</button> : ''}
													{(lot.lotStatus === "IN_PROGRESS" || lot.lotStatus === "WEIGHT_IN_PROGRESS") && <button className='mat-menu-item' onClick={() => {
														// openModal("lot-detail")
														setCustomerDetail({ customerId: item.customerId })
														sessionStorage.setItem('soldBusinessManId', item.soldBusinessManId)
														sessionStorage.setItem('lotDetail', JSON.stringify([...lot.itemDetails, { 'lotNo': lot.lotNo }]))
														setLotDetail(lot)
														navigate("/store/out-inventory")
													}}>
														<i className="" style={{ marginRight: "10px" }} ></i>Weight
													</button>
													}
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
				<Form.Group className="mb-3" >
					<Form.Label>Weight</Form.Label>
					<div>
						{lotDetail.itemDetails.map((item, i) => {
							return (
								<input type='number' name={`weight${item.id}`} value={item.weight}
									disabled={item.weight} className='weight-input'
									onBlur={(e) => handleOnBlur(item.id, e.target.value)} />
							)
						})}
					</div>
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
			<SwitchSoldType customerDetail={customerDetail} closeModal={() => {
				getLots()
				openModal(null)
			}
			} />
		}
	</>);
}

export default Inventory;
