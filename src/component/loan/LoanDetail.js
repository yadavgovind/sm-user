import React, { useEffect, useState } from 'react';
import { getLoanDetailApi } from './handle';

import TableView from '../common/TableView';
import NavbarHoc from '../common/NavbarHoc';
const LoanDetail = () => {
	const [loanDetail, setLoanDetail] = useState([])
	const lotHeading = ['#', 'Customer Name', 'Loan Type', 'Rate of Interest', 'Amount', '']
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
				{ link: '/store#customer', name: 'Customer' },
				{ link: '/store#loan-detail', name: 'Loan Detail' }
			]}
			TableView={() => <TableView
				theading={lotHeading}
				showBackButton={true}
				backUrl={'#customer'}
				TableData={() => {
					return loanDetail.map(((loan, i) => {
						return (<tr className='mat-row cdk-row'>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{i + 1}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.customerName}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.loanType}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.rateOfInterest}</td>
							<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.amount}</td>
						</tr>)
					}))
				}}
			/>}
		/>
	</>);
}

export default LoanDetail;