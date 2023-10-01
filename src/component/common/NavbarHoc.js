import React from 'react';
import { Button } from 'react-bootstrap';
import history from '../../store/history';
import AddCustomer from '../customer/AddCustomer';
const NavbarHoc = (props) => {
	const { navbarArr, TableView, showBackButton, showAddCustomer, backUrl, handleBlur, showSearch } = props
	const renderHeader = () => {
		return (
			<div className='mb-2 mt-2' style={{
				height: 'auto',
				padding: '1px',
				overflow: 'hidden',
			}}>
				<div className='form-group me-3' style={{ float: 'left', marginLeft: "14px" }}>
					{showBackButton && <Button type='' variant="secondary" onClick={() => {
						history.push(backUrl)
						window.location.reload()
					}}>Back</Button>}

					{showAddCustomer && <AddCustomer
					/>}
				</div>
				{showSearch && <div className='form-group me-3' style={{ float: 'right' }}>
					<input className='mat-input-element mat-form-field-autofill-control
									 form-control ng-untouched ng-pristine ng-valid cdk-text-field-autofill-monitored'
						style={{ height: '43px' }}
						placeholder='Search'
						onBlur={(e) => handleBlur(e.target.value)}
					/>
				</div>}
			</div>
		)
	}

	return <div className="row">
		<div className="col-sm-12">
			<div className="cp-rightsection">
				<div className="right-section-tab">
					<div className="right-nav" id="stpperCall">
						<nav className="navbar navbar-expand-lg navbar-light mb-1">
							<div className="nav_inner">
								<div className="collapse navbar-collapse common-stepper">
									<ul className="navbar-nav">
										{navbarArr.map((item, i) => {
											return <li
												className="nav-item">
												<a
													href={item.link}
													className="nav-link">
													<span className="common-stepper-counter">{i + 1}</span>
													<span>
														{item.name}
													</span>
												</a>
											</li>
										})}
									</ul>
								</div>
							</div>
						</nav>
					</div>
				</div>
				<div className='white-bg'>
					<div className='example-table-container'>
						{renderHeader()}
						<TableView />
					</div>
				</div>
			</div>
		</div>
	</div>;
}
export default NavbarHoc;