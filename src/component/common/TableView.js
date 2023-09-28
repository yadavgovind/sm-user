import React from 'react';

const TableView = ({ theading, TableData }) => {

	return <table className='mat-table cdk-table mat-sort example-table w-100'>
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
	</table>;
}

export default TableView;