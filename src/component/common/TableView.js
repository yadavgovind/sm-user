import React from 'react';
import { Button } from 'react-bootstrap';
import history from '../../store/history';
import AddCustomer from '../customer/AddCustomer';
const TableView = ({ theading, showBackButton, showAddCustomer, backUrl, TableData, handleChange, showSearch }) => {

	return <div className='white-bg'>
		<div className='example-table-container'>
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
						onChange={(e) => handleChange(e.target.value)}
					/>
				</div>}
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
					<TableData />
				</tbody>
			</table>

		</div>
	</div>;
}

export default TableView;