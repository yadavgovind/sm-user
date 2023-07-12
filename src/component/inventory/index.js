import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AddInventoryModal from './AddInventoryModal';
import { getProductTypeApi } from './handler';
import { getRoomDetailApi } from '../room/handler';
const Inventory = () => {
	const [productType, setProductType] = useState([])
	const [rooms, setRoom] = useState([])

	useEffect(() => {
		const storeId = sessionStorage.getItem('storeId')
		getProductTypeApi().then((res) => {
			setProductType(res)
		}).catch((err) => {
			console.log(err)
		})
		getRoomDetailApi(storeId.trim()).then((roomDetail) => {
			let roomArr = []
			roomDetail.map(item => roomArr.push(item.roomNo))
			setRoom(roomArr)
		}).catch(err => console.log(err))
	}, [])
	return (<><div>
		<h1>Add Inventory</h1>
	</div>
		<AddInventoryModal productType={productType} roomsArr={rooms} />
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