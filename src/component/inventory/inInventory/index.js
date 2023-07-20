import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AddInventoryModal from './AddInventoryModal';
import { getLotsDetailApi, getProductTypeApi } from './handler';
import { getRoomDetailApi } from '../../room/handler';
const Inventory = () => {
	const [productType, setProductType] = useState([])
	const [lotsList, setLOtsList] = useState([])
	const [rooms, setRoom] = useState([])

	useEffect(() => {
		const storeId = sessionStorage.getItem('storeId').trim()
		getLotsDetailApi(storeId).then((res) => {
			console.log(">>>>res", res)
			setLOtsList(res)
		}).catch((err) => {
			console.log(err)
		})
		getProductTypeApi().then((res) => {
			setProductType(res)
		}).catch((err) => {
			console.log(err)
		})
		getRoomDetailApi(storeId).then((roomDetail) => {
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

		<h4>Lots In Detail</h4>
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
				{lotsList.length ? lotsList.map((item, i) => {
					return item.lotDetails.map((lot => {
						return (<tr>
							<td>{i + 1}</td>
							<td>{item.roomNo}</td>
							<td>{lot.lotNo}</td>
							<td>{item.customerId}</td>
							<td>{lot.itemDetails.length}</td>
							<td>{`${lot.productType}(${lot.productSize})`}</td>
						</tr>)
					}))
				}) : ''}
			</tbody>
		</Table>
	</>);
}

export default Inventory;