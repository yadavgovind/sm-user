import React, { useEffect, useState } from 'react';
// import { Table } from 'react-bootstrap';
import AddCustomer from './AddCustomer';
// import history from '../../store/history'
import './index.css'
import { getCustomerApi, parseJwt } from './handler';
import './table.css'
import { getLotsDetailApi, getProductTypeApi } from '../inventory/inInventory/handler';
import { getRoomDetailApi } from '../room/handler';
import AddInventoryModal from '../inventory/inInventory/AddInventoryModal';
import { useNavigate } from "react-router-dom";
import Loan from '../loan';

const Customer = () => {
	const [state, setState] = useState([])
	const [showOption, toggleButton] = useState('')
	const [currentModal, openModal] = useState(null);
	const [productType, setProductType] = useState([])
	const [customerInfo, setCustomerInfo] = useState({})
	const [customerDetail, setCustomer] = useState({})


	const [lotsList, setLOtsList] = useState([])
	const [rooms, setRoom] = useState([])
	const navigate = useNavigate();

	const theading = ['#', 'Name', 'Store', 'Room No', 'Session', 'Phone', 'Email', 'Address', 'Vehicle', 'Role Type', '']

	const lotHeading = ['#', 'Room No', 'Lot Number', 'Customer Id', 'Quantity', 'Product']

	useEffect(() => {
		const detail = parseJwt(sessionStorage.getItem('token'))
		sessionStorage.setItem('storeId', detail["storeId "])
		const storeId = detail['storeId '].trim()
		getCustomerApi(storeId).then((customerList) => {
			setState(customerList)
		}).catch(err => console.log(err))
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


	return <>

		<div className="row">
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
													className="nav-link">
													<span className="common-stepper-counter">1</span>
													<span>
														Dashboard
													</span>
												</a>
											</li>
											<li
												className="nav-item">
												<a
													className="nav-link">
													<span className="common-stepper-counter">2</span>
													<span>
														Customer
													</span>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</nav>
						</div>
					</div>

					{/* table view */}
					<div className='white-bg'>
						<div className='example-table-container'>
							<div className='mb-2 mt-2' style={{
								height: 'auto',
								padding: '1px',
								overflow: 'hidden',
							}}>
								<div className='form-group me-3' style={{ float: 'left' }}>
									<AddCustomer setCustomer={setCustomer} />
								</div>
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
										{theading.map(heading => {
											return (<th className='mat-header-cell cdk-header-cell cdk-column-checkbox mat-column-checkbox'>
												{heading}
											</th>
											)
										})}
									</tr>
								</thead>
								<tbody>
									{state.map((item, i) => {
										return (<tr className='mat-row cdk-row'>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{i + 1}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.firstName || 'N/A'}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.store || 'N/A'}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.roomNo || 'N/A'}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.registerSession}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.phone}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.email}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.address || 'N/A'}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.vehicleNumber}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox' onClick={() => toggleButton('')}>{item.roleType || 'N/A'}</td>
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
																	sessionStorage.setItem('customerId', item.id)
																	navigate("#in-inventory")
																	window.location.reload()
																}}>
																	<i className="far fa-eye" style={{ marginRight: "10px" }}></i>View
																</button>
															</div>
															<div>
																<button className='mat-menu-item' onClick={() => {
																	openModal("add-inventory")
																	setCustomerInfo(item)
																}}>
																	<i className="far fa-edit" style={{ marginRight: "10px" }}></i>Product In
																</button>
															</div>
															<div>
																<button className='mat-menu-item' onClick={() => {
																	openModal("loan")
																	setCustomerInfo(item)
																}}>
																	<i className="far fa-edit" style={{ marginRight: "10px" }}></i>Loan
																</button>
															</div>
															<div>
																<button className='mat-menu-item' onClick={() => {
																	sessionStorage.setItem('customerId', item.id)
																	navigate("#loan-detail")
																	window.location.reload()
																}}>
																	<i className="far fa-edit" style={{ marginRight: "10px" }}></i>Loan detail
																</button>
															</div>
														</div>
													</div>
												</div>}
											</td>
										</tr>)
									})}

								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<AddInventoryModal productType={productType} roomsArr={rooms}
			currentModal={currentModal}
			openModal={openModal}
			customerDetail={customerInfo}
		/>
		<Loan
			currentModal={currentModal}
			openModal={openModal}
			customerDetail={customerInfo}
		/>
	</>;

}
export default Customer;