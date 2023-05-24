import React, { useState } from 'react';
import Room from '../room';
import Customer from '../customer';
import Sidebar from '../leftMenu/Sidebar';
import Inventary from '../inventary';
import history from '../../store/history'
import './index.css'
const handleRoutes = (hash) => {
	switch (hash) {
		case '#room':
			return <Room />
		case '#customer':
			return <Customer />
		case '#in-inventary':
		case '#out-inventary':
			return <Inventary />
		default:
			return <Customer />
	}
}
const StoreRoutes = () => {
	const [showHideInventary, toggleInventary] = useState(false)
	const [url, setUrl] = useState(history.location.hash)

	const changeUrl = (value) => {
		setUrl(value)
		history.push(value)
	}

	// console.log('hash', hash)
	return <div className="container-fluid">
		<div className="row flex-nowrap">
			<Sidebar handleRoutes={(url) => changeUrl(url)} showHideInventary={showHideInventary} toggleInventary={toggleInventary} />
			<div className="col py-3">
				{handleRoutes(url)}
			</div>
		</div>
	</div>;
}

export default StoreRoutes;
