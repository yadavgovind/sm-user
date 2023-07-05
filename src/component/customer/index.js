import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AddCustomer from './AddCustomer';
import { getCustomerApi, parseJwt } from './handler';
const Customer = () => {
	const [state, setState] = useState([])
	useEffect(() => {
		const detail = parseJwt(sessionStorage.getItem('token'))
		sessionStorage.setItem('storeId', detail["storeId "])
		getCustomerApi(detail['storeId '].trim()).then((customerList) => {
			setState(customerList)
		})

	}, [])
	return <div><h1>Customer</h1>
		<AddCustomer />
		{state.length && <Table striped="columns" bordered className='mt-2'>
			<thead>
				<tr>
					<th>S.No</th>
					<th>Name</th>
					<th>Phone</th>
					<th>Email</th>
					<th>Vehicle No</th>
				</tr>
			</thead>
			<tbody>
				{state.map((item, i) => {
					return (<tr>
						<td>{i + 1}</td>
						<td>{item.firstName}</td>
						<td>{item.customerNumber}</td>
						<td>{item.email}</td>
						<td>{item.vehicleNumber}</td>
					</tr>)
				})}

			</tbody>
		</Table>}
	</div>;
}
export default Customer;