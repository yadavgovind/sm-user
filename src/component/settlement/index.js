import React, { useState, useEffect } from 'react';
import NavbarHoc from '../common/NavbarHoc';
import TableView from '../common/TableView';
import { getSoldScheduleApi } from './handler';

const Settlement = () => {
	const [settlementList, setList] = useState([])
	const lotHeading = ['Customer', 'Supplier', 'Sold_Quantity', 'Price', 'Status',  'Weight_Date', 'Payment_Date', 'Total_Amount', 'Paid_Amount']
	const storeId = sessionStorage.getItem('storeId').trim()
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
				{ link: '/store', name: 'Settlement' }
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
 

						</tr>)
					}) : ''

				}}
			/>}
		/>);
}
export default Settlement;