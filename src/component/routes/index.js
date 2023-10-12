import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Room from '../room';
import Customer from '../customer';
import Sidebar from '../leftMenu/Sidebar';
import Inventory from '../inventory/inInventory';
import './index.css'
import Dashboard from '../dashboard'
import '../dashboard/index.css'
import './table.css'

import LoanDetail from '../loan/LoanDetail';
import SoldInventory from '../inventory/inInventory/SoldInventory';
import Settlement from '../settlement';


const StoreRoutes = () => {
	return <div className="container-fluid">
		<div className="row flex-nowrap">
			<Sidebar />
			<div className="col pd-0">
				<div className="header-main">
					<a href='/' style={{
						float: 'right',
						cursor: 'pointer',
						color: 'white',
						textDecoration: 'none'
					}}>Log out</a>
				</div >
				<div className="common-head-container">
					<div className='row'>
						<div className='col-sm-8 px-2'>
							{/* <p className='text1 text-color'>
								Dashboard
							</p> */}
							<p className="text-color text1 text1a">
								Welcome {sessionStorage.getItem('storeName')}
							</p>
						</div>
						<Routes>
							<Route path={'/store/customer'} element={<Customer />} />
							<Route path={'/store/dashboard'} element={<Dashboard />} />
							<Route path={'/store/room'} element={<Room />} />
							<Route path={'/store/in-inventory'} element={<Inventory />} />
							<Route path={'/store/out-inventory'} element={<SoldInventory />} />
							<Route path={'/store/loan-detail'} element={<LoanDetail />} />
							<Route path={'/store/settlement'} element={<Settlement />} />
						</Routes>
					</div>
				</div >
			</div>
		</div>
	</div>;
}

export default StoreRoutes;
