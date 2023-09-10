import React, { useEffect, useState } from 'react';
import './index.css'
import { getRoomDetailApi } from './handler';
const Room = () => {
	const [rooms, setRoom] = useState([])
	useEffect(() => {
		const storeId = sessionStorage.getItem('storeId')
		getRoomDetailApi(storeId && storeId.trim()).then((roomDetail) => {
			setRoom(roomDetail)
			let roomArr = []
			roomDetail.map(item => roomArr.push(item.roomNo))

		}).catch(err => console.log(err))
	}, [])
	return <div>
		<h1>Rooms</h1>
		{rooms.length ? rooms.map((item, index) => {
			return <div className="container border">
				<div className='hd-main'><div className='room-no'><h3>{item.roomNo}</h3></div></div>
				{
					item.floorDetails.map((floor, i) => {
						return (<div className="row">
							{
								floor.columnDetails.map((col, index) => {
									const { initLotCapacity, currentLotCapacity } = col
									const fullLotsSize = ((initLotCapacity - currentLotCapacity) / initLotCapacity) * 100
									const color1 = '#4477C5'
									const color2 = '#e6e0ef'
									const percentage1 = `${fullLotsSize}%`
									const percentage2 = '0%'
									return (<div className="col grid br-radius" style={{ background: `linear-gradient(to right, ${color1} ${percentage1}, ${color2} ${percentage2}` }} key={`${i}${index}`}>
										{`${floor.floorNo} of ${col.columnNo}`}
									</div>)
								})
							}
						</div>)

					})
				}
			</div>
		}) : ''
		}
	</div>;
}
export default Room;