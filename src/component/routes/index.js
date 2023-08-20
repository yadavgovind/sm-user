import React, { useState } from 'react';
import Room from '../room';
import Customer from '../customer';
import Sidebar from '../leftMenu/Sidebar';
import Inventory from '../inventory/inInventory';
import history from '../../store/history'
import './index.css'
import OutInventory from '../inventory/outInventory';
import Dashboard from '../dashboard'
import '../dashboard/index.css'
import './table.css'

import LoanDetail from '../loan/LoanDetail';
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
		case '#loan-detail':
			return <LoanDetail />
		default:
			return <Dashboard />
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
			<div className="col pd-0">
				<div className="header-main">
					Navbar
				</div >
				<div className="common-head-container">
					<div className='row'>
						<div className='col-sm-8 px-2'>
							<p className='text1 text-color'>
								Dashboard
							</p>
							<h2 className="text-color text1 text1a">
								Welcome
							</h2>
						</div>
						{handleRoutes(url)}
					</div>
				</div >
			</div>
		</div>
	</div>;
}

export default StoreRoutes;
