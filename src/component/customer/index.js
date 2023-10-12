import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './index.css'
import { addCustomerApi, getCustomerApi, getSearchCustomerApi, parseJwt } from './handler';
import './table.css'
import { addInventoryApi, getProductTypeApi } from '../inventory/inInventory/handler';
import { getAvailableListApi } from '../room/handler';
import AddInventoryModal from '../inventory/inInventory/AddInventoryModal';
import { useNavigate } from "react-router-dom";
import Loan from '../loan';
import NavbarHoc from '../common/NavbarHoc';
import TableView from '../common/TableView';

const Customer = () => {
	const [state, setState] = useState([])
	const [showOption, toggleButton] = useState('')
	const [currentModal, openModal] = useState(null);
	const [productType, setProductType] = useState([])
	const [customerInfo, setCustomerInfo] = useState({})
	const [rooms, setRoom] = useState([])
	const navigate = useNavigate();

	const theading = ['#', 'Name', 'Store', 'Room No', 'Session', 'Phone', 'Email', 'Address', 'Vehicle', 'Role Type', '']
	const detail = parseJwt(sessionStorage.getItem('token'))
	sessionStorage.setItem('storeId', detail["storeId "])
	const storeId = detail['storeId '].trim()
	useEffect(() => {
		getCustomerApi(storeId).then((customerList) => {
			setState(customerList)
		}).catch(err => console.log(err))
		getProductTypeApi().then((res) => {
			setProductType(res)
		}).catch((err) => {
			console.log(err)
		})
		getAvailableListApi(storeId).then((roomDetail) => {
			let roomArr = []
			roomDetail.map(item => roomArr.push(item.roomNo))
			setRoom(roomArr)
		}).catch(err => console.log(err))
	}, [])

	const handleBlur = (value) => {
		if (value) {
			getSearchCustomerApi(value).then((customerList) => {
				setState(customerList)
			}).catch(err => console.log(err))
		} else if (value === '') {
			getCustomerApi(storeId).then((customerList) => {
				setState(customerList)
			}).catch(err => console.log(err))
		}
	}

	const onSubmitAddCustomer = async (payload) => {
		try {
			const newCustomer = await addCustomerApi(payload)
			toast.success("Inventory added successfully")
			setState(newCustomer)
			return
		} catch (err) {
			toast.error((err && err.message) || 'Something went wrong.')
			return
		}
	}
	return <>
		<NavbarHoc
			navbarArr={[
				{ link: '/store/dashboard', name: 'Dashboard' },
				{ link: '/store/customer', name: 'Customer' },
			]}
			onSubmitAddCustomer={onSubmitAddCustomer}
			showAddCustomer={true}
			showSearch
			handleBlur={handleBlur}
			TableView={() => <TableView
				theading={theading}

				TableData={() => {
					return state.map((item, i) => {
						return (<tr className='mat-row cdk-row' key={i}>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{i + 1}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.firstName || 'N/A'}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.store || 'N/A'}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.roomNo || 'N/A'}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.registerSession}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.phone}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox' style={{ textTransform: 'lowercase' }}>{item.email}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.address || 'N/A'}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.vehicleNumber}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox' onClick={() => toggleButton('')}>{item.roleType || 'N/A'}</td>
							{item.roleType !== 'supplier' ? <td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>
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
													navigate("/store/in-inventory")
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
													navigate("/store/loan-detail")

												}}>
													<i className="far fa-edit" style={{ marginRight: "10px" }}></i>Loan detail
												</button>
											</div>
										</div>
									</div>
								</div>}
							</td>
								:
								<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'></td>
							}
						</tr>)
					})
				}}
			/>}
		/>
		<AddInventoryModal productType={productType} roomsArr={rooms}
			currentModal={currentModal}
			openModal={openModal}
			customerDetail={customerInfo}
		/>
		{currentModal === "loan" && <Loan
			currentModal={currentModal}
			openModal={openModal}
			customerDetail={customerInfo}
		/>
		}
	</>;

}
export default Customer;