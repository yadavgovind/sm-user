import React, { useEffect, useState } from 'react';
import { getLoanDetailApi } from './handle';
import { Button } from 'react-bootstrap';
import history from '../../store/history';
const LoanDetail = () => {
	const [loanDetail, setLoanDetail] = useState([])
	const lotHeading = ['#', 'Customer Name', 'Loan Type', 'Rate of Interest', 'Amount', '']
	const customerId = sessionStorage.getItem('customerId')

	const getLoanDetail = () => {
		const storeId = sessionStorage.getItem('storeId').trim()
		getLoanDetailApi(storeId).then((res) => {
			let loan = res.find(item => item.customerId === Number(customerId))
			loan && setLoanDetail([loan])
		}).catch((err) => {
			console.log(err)
		})
	}

	useEffect(() => {
		getLoanDetail()
	})


	return (<>
		<h4>Loan Detail</h4>
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
													href='/store'
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
													href='/store#customer'
													className="nav-link">
													<span className="common-stepper-counter">2</span>
													<span>
														Customer
													</span>
												</a>
											</li>
											<li
												className="nav-item">
												<a
													href='/store#loan-detail'
													className="nav-link">
													<span className="common-stepper-counter">3</span>
													<span>
														Loan Detail
													</span>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</nav>
						</div>
					</div>
					<div className='white-bg'>
						<div className='example-table-container'>
							<div className='mb-2 mt-2' style={{
								height: 'auto',
								padding: '1px',
								overflow: 'hidden',
							}}>
								<div className='form-group me-3' style={{ float: 'left', marginLeft: "14px" }}>
									<Button type='' variant="secondary" onClick={() => {
										history.push('#customer')
										window.location.reload()
									}}>Back</Button>
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
										{lotHeading.map(heading => {
											return (<th className='mat-header-cell cdk-header-cell cdk-column-checkbox mat-column-checkbox'>
												{heading}
											</th>
											)
										})}
									</tr>
								</thead>
								<tbody>
									{loanDetail.map(((loan, i) => {
										return (<tr className='mat-row cdk-row'>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{i + 1}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.customerName}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.loanType}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.rateOfInterest}</td>
											<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{loan.amount}</td>
											{/* <td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox' onClick={() => toggleButton('')}>{`${lot.productType}(${lot.productSize})`}</td> */}
											{/* <td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>
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
															openModal("soldType")
															setCustomerDetail({ customerId: item.customerId, lotNo: lot.lotNo })
														}}>
															<i className="far fa-eye" style={{ marginRight: "10px" }}></i>View
														</button>
														<button className='mat-menu-item' onClick={() => {
															openModal("lot-detail")
															setCustomerDetail({ customerId: item.customerId })
															setLotDetail(lot)
														}}>
															<i className="" style={{ marginRight: "10px" }} ></i>Sold
														</button>
													</div>
												</div>
											</div>
										</div>}
									</td> */}
										</tr>)
									}))
									}
								</tbody>
							</table>

						</div>
					</div>
				</div>
			</div>
		</div>
	</>);
}

export default LoanDetail;