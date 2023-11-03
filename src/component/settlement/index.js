import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import NavbarHoc from '../common/NavbarHoc';
import TableView from '../common/TableView';
import { getSoldScheduleApi } from './handler';
import KebabMenu from '../common/KebabMenu';

const Settlement = () => {
	const [settlementList, setList] = useState([])
	const [showOption, toggleButton] = useState('')
	const lotHeading = ['Customer', 'Supplier', 'Sold_Quantity', 'Price', 'Status', 'Weight_Date', 'Payment_Date', 'Total_Amount', 'Paid_Amount', '']
	const storeId = sessionStorage.getItem('storeId').trim()
	const navigate = useNavigate();
	const getSettlementList = () => {
		getSoldScheduleApi(storeId).then((res) => {
			setList(res)
		}).catch((err) => {
			console.log(err)
		})
	}


	useEffect(() => {
		getSettlementList()
	}, [])
	return (
		<NavbarHoc
			navbarArr={[
				{ link: '/store/settlement', name: 'Settlement' }
			]}
			TableView={() => <TableView
				theading={lotHeading}
				TableData={() => {
					return settlementList.length ? settlementList.map((item, i) => {
						return (<tr className='mat-row cdk-row' key={i}>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.customerName || '-'}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.supplierName || '-'}</td>
							{/* <td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.lotNo}</td> */}
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.soldQuantity}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.price}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.soldStatus}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.weightDate || '-'}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.paymentDate}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{Math.round(item.totalAmount)}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{Math.round(item.paidAmount)}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>
								<div className='btn-group dropleft' style={{ float: 'right' }}>
									<button className='mat-menu-trigger btn btn3bot' onClick={() => toggleButton(i)}>
										<KebabMenu />
									</button>
								</div>
								{i === showOption && (item.soldStatus === "IN_PROGRESS" || item.soldStatus === "WEIGHT_IN_PROGRESS") && <div className='cdk-overlay-pane'>
									<div className='mat-menu-panel mat-elevation-z4'>
										<div className='mat-menu-content'>
											<div>
												<button className='mat-menu-item' onClick={() => {

													sessionStorage.setItem('soldBusinessManId', item.supplierId)
													sessionStorage.setItem('lotDetail', JSON.stringify([...item.itemDetails, {
														lotNo: item.lotNo
													},
													{ customerId: item.customerId },
													{ soldScheduleId: item.id }
													]))
													// setLotDetail(lot)
													navigate("/store/out-inventory")
												}}>
													<i className="" style={{ marginRight: "10px" }} ></i>Weight
												</button>
											</div>
										</div>
									</div>
								</div>
								}
							</td>
						</tr>)
					}) : ''

				}}
			/>}
		/>);
}
export default Settlement;