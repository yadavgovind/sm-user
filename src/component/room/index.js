import React, { useEffect, useState } from 'react';
import './index.css'
import { getRoomDetailApi } from './handler';
const Room = () => {
	let rooms = [1, 2, 3]
	let row = [1, 2, 3, 4];
	let col = [1, 2, 3];
	const [state, setState] = useState([])
	useEffect(() => {
		const storeId = sessionStorage.getItem('storeId')
		getRoomDetailApi(storeId.trim()).then((roomDetail) => {
			setState(roomDetail)
		})
	}, [])
	console.log('state', state)
	return <div>
		<h1>Rooms</h1>
		{rooms.map((roomNo, index) => {
			return <div className="container">
				<h3>Room {index + 1}</h3>
				{
					row.map((item, i) => {
						return (<div className="row">
							{
								col.map((item, index) => {
									return (<div className="col grid " key={`${i}${index}`}>
										{`${i + 1} of ${index + 1}`}
									</div>)
								})
							}
						</div>)

					})
				}
			</div>
		})
		}
	</div>;
}
export default Room;