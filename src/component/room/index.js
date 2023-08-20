import React, { useEffect, useState } from 'react';
import './index.css'
import { getRoomDetailApi } from './handler';
const Room = () => {
	const [rooms, setRoom] = useState([])
	useEffect(() => {
		const storeId = sessionStorage.getItem('storeId')
		getRoomDetailApi(storeId.trim()).then((roomDetail) => {
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
									return (<div className="col grid br-radius" key={`${i}${index}`}>
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