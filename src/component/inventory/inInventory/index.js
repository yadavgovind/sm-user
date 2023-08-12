import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AddInventoryModal from './AddInventoryModal';
import { getLotsDetailApi, getProductTypeApi } from './handler';
import { getRoomDetailApi } from '../../room/handler';
const Inventory = () => {
	const [productType, setProductType] = useState([])
	const [lotsList, setLOtsList] = useState([])
	const [rooms, setRoom] = useState([])
	const lotHeading = ['#', 'Room No', 'Lot Number', 'Customer Id', 'Quantity', 'Product', '']
	const [showOption, toggleButton] = useState('')
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
	return (<>
		<h4>Lots In Detail</h4>

		<div className='white-bg'>
			<div className='example-table-container'>
				<div className='mb-2 mt-2' style={{
					height: 'auto',
					padding: '1px',
					overflow: 'hidden',
				}}>
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
						{lotsList.length ? lotsList.map((item, i) => {
							return item.lotDetails.map((lot => {
								return (<tr className='mat-row cdk-row'>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{i + 1}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.roomNo}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.lotNo}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{item.customerId}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>{lot.itemDetails.length}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox' onClick={() => toggleButton('')}>{`${lot.productType}(${lot.productSize})`}</td>
									<td className='mat-cell cdk-cell cdk-column-checkbox mat-column-checkbox'>
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
														<button className='mat-menu-item'>
															<i className="" style={{ marginRight: "10px" }}></i>Sold
														</button>
													</div>
												</div>
											</div>
										</div>}
									</td>
								</tr>)
							}))
						}) : ''}
					</tbody>
				</table>

			</div>
		</div>
	</>);
}

export default Inventory;