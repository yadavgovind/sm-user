import React, { useState, useEffect } from 'react';
import NavbarHoc from '../common/NavbarHoc';
import TableView from '../common/TableView';
import { getSoldScheduleApi } from './handler';

const Settlement = () => {
	const [settlementList, setList] = useState([])
	const lotHeading = ['Customer', 'Supplier', 'Sold Quantity', 'Price', 'Sold Status', 'Sold Type',
		'Sold Date', 'Weight Date', 'Payment Date', 'Total Amount', 'Paid Amount', 'Store Charge', 'Weight Charge']
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
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.customerId || '-'}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.supplierId || '-'}</td>
							{/* <td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.lotNo}</td> */}
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.soldQuantity}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.price}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.soldStatus}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.soldType}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.soldDate || '-'}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.weightDate || '-'}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.paymentDate}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.soldQuantity}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.totalAmount}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.paidAmount}</td>

							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.storeCharge}</td>

							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.weightCharge}</td>

						</tr>)
					}) : ''

				}}
			/>}
		/>);
}
export default Settlement;