import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AddCustomer from './AddCustomer';
import { getCustomerApi, parseJwt } from './handler';
const Customer = () => {
	const [state, setState] = useState({})
	useEffect(() => {
		const detail = parseJwt(sessionStorage.getItem('token'))
		sessionStorage.setItem('storeId', detail["storeId "])
		getCustomerApi(detail['storeId '].trim()).then((customerList) => {
			setState(customerList)
		})

	}, [state])
	return <div><h1>Customer</h1>
		<AddCustomer />
		<Table striped="columns" bordered className='mt-2'>
			<thead>
				<tr>
					<th>S.No</th>
					<th>Full Name</th>
					<th>Phone number</th>
					<th>Email</th>
					<th>Rooms</th>
				</tr>
			</thead>
			<tbody>
				
				<tr>
					<td>1</td>
					<td>Mark</td>
					<td>1234567898</td>
					<td>@mdo</td>
					<td>5</td>
				</tr>
				<tr>
					<td>2</td>
					<td>Jacob</td>
					<td>1234567898</td>
					<td>@fat</td>
					<td>7</td>
				</tr>
			</tbody>
		</Table>
	</div>;
}
export default Customer;