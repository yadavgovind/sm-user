import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './index.css'
import { addCustomerApi, getCustomerApi, getSearchCustomerApi, parseJwt } from './handler';
import './table.css'
import { getProductTypeApi } from '../inventory/inInventory/handler';
import { getAvailableListApi } from '../room/handler';
import AddInventoryModal from '../inventory/inInventory/AddInventoryModal';
import { useNavigate } from "react-router-dom";
import Loan from '../loan';
import NavbarHoc from '../common/NavbarHoc';
import TableView from '../common/TableView';
import KebabMenu from '../common/KebabMenu';
import EyeIcon from '../common/EyeIcon';
import ProductInIcon from '../common/ProductInIcon';
import InfoIcon from '../common/InfoIcon';

const Customer = () => {
	const [state, setState] = useState([])
	const [showOption, toggleButton] = useState('')
	const [currentModal, openModal] = useState(null);
	const [productType, setProductType] = useState([])
	const [customerInfo, setCustomerInfo] = useState({})
	const [rooms, setRoom] = useState([])
	const navigate = useNavigate();

	const theading = [ 'Name', 'Session', 'Phone', 'Email', 'Address', 'Vehicle', 'Role Type', '']
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
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.firstName || 'N/A'}</td>
						  <td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.registerSession}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.phone}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox' style={{ textTransform: 'lowercase' }}>{item.email}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.address || 'N/A'}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.vehicleNumber}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox' onClick={() => toggleButton('')}>{item.roleType || 'N/A'}</td>
							{item.roleType !== 'supplier' ? <td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>
								<div className='btn-group dropleft' style={{ float: 'right' }}>
									<button className='mat-menu-trigger btn btn3bot' onClick={() => toggleButton(i)}>
										<KebabMenu />
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
													<EyeIcon /><span style={{ marginLeft: "10px" }}>View</span>
												</button>
											</div>
											<div>
												<button className='mat-menu-item' onClick={() => {
													openModal("add-inventory")
													setCustomerInfo(item)
												}}>
													<ProductInIcon /><span style={{ marginLeft: "10px" }}>Product In</span>
												</button>
											</div>
											<div>
												<button className='mat-menu-item' onClick={() => {
													openModal("loan")
													setCustomerInfo(item)
												}}>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
														<path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
													</svg><span style={{ marginLeft: "10px" }}>Loan</span>
												</button>
											</div>
											<div>
												<button className='mat-menu-item' onClick={() => {
													sessionStorage.setItem('customerId', item.id)
													navigate("/store/loan-detail")

												}}>
													<InfoIcon /><span style={{ marginLeft: "10px" }}>Loan detail</span>
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