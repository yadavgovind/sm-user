import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Room from '../room';
import Customer from '../customer';
import Sidebar from '../leftMenu/Sidebar';
import Inventory from '../inventory/inInventory';
import history from '../../store/history'
import './index.css'
import Dashboard from '../dashboard'
import '../dashboard/index.css'
import './table.css'

import LoanDetail from '../loan/LoanDetail';
import SoldInventory from '../inventory/inInventory/SoldInventory';
import Settlement from '../settlement';
const handleRoutes = (hash) => {
	switch (hash) {
		case '#room':
			return <Room />
		case '#customer':
			return <Customer />
		case '#dashboard':
			return <Dashboard />
		case '#in-inventory':
			return <Inventory />
		case '#out-inventory':
			return <SoldInventory />
		case '#loan-detail':
			return <LoanDetail />
		case '#settlement':
			return <Settlement />
		default:
			return <Dashboard />
	}
}
const StoreRoutes = () => {
	const [url, setUrl] = useState(history.location.hash)
	const navigate = useNavigate();
	const changeUrl = (value) => {
		setUrl(value)
		history.push(value)
	}
	const handleLogout = () => {
		sessionStorage.clear()
		navigate("/")
	}

	return <div className="container-fluid">
		<div className="row flex-nowrap">
			<Sidebar handleRoutes={(url) => changeUrl(url)} />
			<div className="col pd-0">
				<div className="header-main">
					<div style={{ float: 'right', cursor: 'pointer' }} onClick={() => handleLogout()}>Log out</div>
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
