import { useState, useEffect } from 'react';
import BarGraph from './barGraph';
import Card from './Card';

import './index.css'
import { getDashboardCountApi, getProductInCountApi, getProductOutCountApi } from './handler';
const Dashboard = () => {
	const [dashboardCount, setDashboardCount] = useState({ customerCount: 0, loanAmount: 0, totalProductIn: 0, totalProductOut: 0 })
	const [productInCount, setProductIn] = useState({ quantity: 0 })
	const [productOutCount, setProductOut] = useState({ quantity: 0 })

	useEffect(() => {
		getDashboardCountApi()
			.then(res => res && setDashboardCount(res))
			.catch(err => console.log(err))
		getProductInCountApi()
			.then(res => res && setProductIn(res))
			.catch(err => console.log(err))
		getProductOutCountApi()
			.then(res => res && setProductOut(res))
			.catch(err => console.log(err))
	}, [])
	return (
		<>
			<Card dashboardCount={dashboardCount} productInCount={productInCount} productOutCount={productOutCount} />
			<BarGraph productInCount={productInCount} productOutCount={productOutCount} />
		</>

	)
}
export default Dashboard;