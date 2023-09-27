import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import BarGraph from './barGraph';
import Card from './Card';

import './index.css'
import { getDashboardCountApi, getProductInCountApi, getProductOutCountApi } from './handler';
import { getProductTypeApi } from '../inventory/inInventory/handler';
import { getAvailableListApi } from '../room/handler';
import { parseJwt } from '../customer/handler';
import ProductFilter from './ProductFilter';

const Dashboard = () => {
	const [year, setYear] = useState(2023)
	const [state, setProduct] = useState({
		brandProductInQ: 0, brandProductIn: 1,
		brandProductOutQ: 0, brandProductOut: 1,
		roomProductInQ: 0, roomProductIn: 1,
		roomProductOutQ: 0, roomProductOut: 1
	})
	const [productType, setProductType] = useState([])
	const [dashboardCount, setDashboardCount] = useState({ customerCount: 0, loanAmount: 0, totalProductIn: 0, totalProductOut: 0 })
	const [rooms, setRoom] = useState([])
	const [loading, setLoading] = useState(false)

	const detail = parseJwt(sessionStorage.getItem('token'))
	sessionStorage.setItem('storeId', detail["storeId "])
	const storeId = detail['storeId '].trim()

	useEffect(() => {
		setLoading(true)
		getDashboardCountApi(year)
			.then(res => {
				res && setDashboardCount(res)
				setLoading(false)
			})
			.catch(err => setLoading(false))
	}, [year])

	const handleSelect = (value) => {
		setYear(value)
	}
	useEffect(() => {
		getProductTypeApi().then((res) => {
			setProductType(res)
		}).catch((err) => {
			console.log(err)
		})
		getAvailableListApi(storeId).then((roomDetail) => {
			let roomArr = []
			roomDetail.map(item => roomArr.push(item.roomNo))
			setRoom(roomArr)
		}).catch((err) => {
			console.log(err)
		})
	}, [])
	useEffect(() => {
		getProductInCountApi('brand', state.brandProductIn)
			.then(res => res && setProduct({ ...state, brandProductInQ: res.quantity }))
			.catch(err => console.log(err))
		getProductOutCountApi('brand', state.brandProductOut)
			.then(res => res && setProduct({ ...state, brandProductOutQ: res.quantity }))
			.catch(err => console.log(err))
	}, [state.brandProductIn, state.brandProductOut])

	useEffect(() => {
		getProductInCountApi('room', state.roomProductIn)
			.then(res => res && setProduct({ ...state, roomProductInQ: res.quantity }))
			.catch(err => console.log(err))
		getProductOutCountApi('room', state.roomProductOut)
			.then(res => res && setProduct({ ...state, roomProductOutQ: res.quantity }))
			.catch(err => console.log(err))
	}, [state.roomProductIn, state.roomProductOut])

	const handleChange = (key, value) => {
		setProduct({ ...state, [key]: value })
	}
	return (
		<>
			{loading ?
				<div className='main-content'>
					<div className='card cardSpace'>
						<div className='card-body'>
							<div className='flex-block ht-75' style={{ justifyContent: 'center' }}><Spinner animation="border" />
							</div>
						</div>
					</div>
				</div>
				: <><Card
					dashboardCount={dashboardCount}
					handleSelect={handleSelect} />
					<ProductFilter
						roomsArr={rooms}
						product={state}
						productType={productType}
						handleChange={handleChange}
					/>
					<BarGraph /></>}
		</>

	)
}
export default Dashboard;