import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import OutInventoryModal from './OutInventoryModal';
const OutInventory = () => {

	useEffect(() => {

	}, [])
	return (<><div>
		<h1>Out Inventory</h1>
	</div>
		<OutInventoryModal />
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

		<h4>Lots Out Detail</h4>
		<Table striped="columns" bordered>
			<thead>
				<tr>
					<th>S.No</th>
					<th>Room Number</th>
					<th>Lot Number</th>
					<th>Customer ID</th>
					<th>Quantity</th>
					<th>Product</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{1}</td>
					<td>{3}</td>
					<td>{4}</td>
					<td>{5}</td>
					<td>{6}</td>
					<td>{7}</td>
				</tr>
			</tbody>
		</Table>
	</>);
}

export default OutInventory;