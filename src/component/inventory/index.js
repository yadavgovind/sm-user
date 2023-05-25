import React from 'react';
import { Table } from 'react-bootstrap';
import AddInventoryModal from './AddInventoryModal';
const Inventory = () => {
	return (<><div>
		<h1>Add Inventory</h1>
	</div>
		<AddInventoryModal />
		<div className="input-group w-25 float-end">
			<input
				type="search"
				className="form-control rounded"
				placeholder="Search Customer"
				aria-label="Search"
				aria-describedby="search-addon" />
			<button type="button" className="btn btn-primary">
				<i className='fas fa-search'></i></button>
		</div>

		<h4 className='mt-2'>Customer detail</h4>
		<Table striped="columns" bordered>
			<thead>
				<tr>
					<th>S.No</th>
					<th>Full Name</th>
					<th>Phone number</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>Mark</td>
					<td>1234567898</td>
					<td>@mdo</td>
				</tr>
			</tbody>
		</Table>
		<h4>Available lots</h4>
		<Table striped="columns" bordered>
			<thead>
				<tr>
					<th>S.No</th>
					<th>Room Number</th>
					<th>Row</th>
					<th>Column</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>4</td>
					<td>5</td>
					<td>3</td>
				</tr>
			</tbody>
		</Table>
	</>);
}

export default Inventory;