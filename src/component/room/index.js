import React, { useEffect, useState } from 'react';
import './index.css'
import { getRoomDetailApi } from './handler';
const Room = () => {
	let row = [1, 2, 3, 4, 5, 6, 7, 8];
	let col = [1, 2, 3, 4, 5, 6];
	const [state, setState] = useState([])
	useEffect(() => {
		const storeId = sessionStorage.getItem('storeId')
		getRoomDetailApi(storeId.trim()).then((roomDetail) => {
			setState(roomDetail)
		})
	}, [])
	console.log('state', state)
	return <div>
		<h1>Room</h1>
		<div className="container">
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
	</div>;
}
export default Room;