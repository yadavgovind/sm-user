import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { getLotsDetailApi, getSuppliersApi, outInventoryApi } from './handler';
import SwitchSoldType from './SwitchSoldType';
import TableView from '../../common/TableView';
import NavbarHoc from '../../common/NavbarHoc';
import KebabMenu from '../../common/KebabMenu';

const Inventory = () => {
	const [lotsList, setLOtsList] = useState([])
	const [currentModal, openModal] = useState(null)
	const lotHeading = ['supplier', 'Lot Number', 'Customer Name', 'Total Quantity', 'Available Quantity', 'status', 'Product', '']
	const [showOption, toggleButton] = useState('')
	const [customerDetail, setCustomerDetail] = useState({})
	// const [searchUser, setSearchUser] = useState('')
	const [supplier, setSupplier] = useState([])
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
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.supplierName || '-'}</td>

								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.lotNo}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.customerName}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.totalQuantity}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.availableQuantity}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.lotStatus}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox' onClick={() => toggleButton('')}>{`${lot.productType}(${lot.productSize})`}</td>
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>
									<div className='btn-group dropleft' style={{ float: 'right' }}>
										<button className='mat-menu-trigger btn btn3bot' onClick={() => toggleButton(index)}>
											<KebabMenu />
										</button>
									</div>
									{index === showOption && lot.availableQuantity && supplier.length ? <div className='cdk-overlay-pane'>
										<div className='mat-menu-panel mat-elevation-z4'>
											<div className='mat-menu-content'>
												<div>
													<button className='mat-menu-item' onClick={() => {
														openModal("soldType")
														setCustomerDetail({ customerId: item.customerId, ...lot })
													}}>
														<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up" viewBox="0 0 16 16">
															<path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z" />
															<path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z" />
														</svg><span style={{ marginLeft: "10px" }}>Sold Schedule</span>
													</button>
												</div>
											</div>
										</div>
									</div> : ''}
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
