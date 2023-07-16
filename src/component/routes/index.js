import React, { useState } from 'react';
import Room from '../room';
import Customer from '../customer';
import Sidebar from '../leftMenu/Sidebar';
import Inventory from '../inventory/inInventory';
import history from '../../store/history'
import './index.css'
import OutInventory from '../inventory/outInventory';
const handleRoutes = (hash) => {
	switch (hash) {
		case '#room':
			return <Room />
		case '#customer':
			return <Customer />
		case '#in-inventory':
			return <Inventory />
		case '#out-inventory':
			return <OutInventory />
		default:
			return <Customer />
	}
}
const StoreRoutes = () => {
	const [showHideInventory, toggleInventory] = useState(false)
	const [url, setUrl] = useState(history.location.hash)

	const changeUrl = (value) => {
		setUrl(value)
		history.push(value)
	}

	// console.log('hash', hash)
	return <div className="container-fluid">
		<div className="row flex-nowrap">
			<Sidebar handleRoutes={(url) => changeUrl(url)} showHideInventory={showHideInventory} toggleInventory={toggleInventory} />
			<div className="col py-3">
				{handleRoutes(url)}
			</div>
		</div>
	</div>;
}

export default StoreRoutes;
