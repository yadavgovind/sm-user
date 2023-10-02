import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getLoanDetailApi } from './handle';

import TableView from '../common/TableView';
import NavbarHoc from '../common/NavbarHoc';
const LoanDetail = () => {
	const [loanDetail, setLoanDetail] = useState([])
	const lotHeading = ['#', 'Customer Name', 'Loan Type', 'Count of Packets', 'Transaction Type', 'Rate of Interest', 'Amount', 'Date', '']
	const customerId = sessionStorage.getItem('customerId')

	const getLoanDetail = () => {
		const storeId = sessionStorage.getItem('storeId').trim()
		getLoanDetailApi(storeId).then((res) => {
			let loan = res.filter(item => item.customerId === Number(customerId))
			loan && setLoanDetail(loan)
		}).catch((err) => {
			console.log(err)
		})
	}
	useEffect(() => {
		getLoanDetail()
	}, [])

	return (<>
		<h4>Loan Detail</h4>
		<NavbarHoc
			navbarArr={[
				{ link: '/store', name: 'Dashboard' },
				{ link: '/store/customer', name: 'Customer' },
				{ link: '/store/loan-detail', name: 'Loan Detail' }
			]}
			showBackButton={true}
			backUrl={'/store/customer'}
			TableView={() => <TableView
				theading={lotHeading}
				TableData={() => {
					return loanDetail.map(((loan, i) => {
						let date1 = new Date(loan.transactionDate);
						let dateTime1 = moment(date1).format('DD-MM-YYYY');
						return (<tr className='mat-row cdk-row'>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{i + 1}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.customerName}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.loanType}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.countOfPackets}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.transactionType}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.rateOfInterest}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.amount}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{dateTime1}</td>

						</tr>)
					}))
				}}
			/>}
		/>
	</>);
}

export default LoanDetail;