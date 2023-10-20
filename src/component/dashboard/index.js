import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import BarGraph from './barGraph';
import Card from './Card';

import './index.css'
import { getDashboardCountApi, getProductInCountApi, getProductOutCountApi, getAverageRateApi } from './handler';
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
	const [isOnload, setOnLoad] = useState(true)
	const [customers, setCustomers] = useState([])


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
		if (state.brandProductIn !== 'select') {
			!isOnload && getProductInCountApi('brand', state.brandProductIn)
				.then(res => res && setProduct({ ...state, brandProductInQ: res.quantity }))
				.catch(err => console.log(err))
		} else {
			setProduct({ ...state, brandProductInQ: 0 })
		}

	}, [state.brandProductIn])
	useEffect(() => {
		if (state.brandProductOut !== 'select') {
			!isOnload && getProductOutCountApi('brand', state.brandProductOut)
				.then(res => res && setProduct({ ...state, brandProductOutQ: res.quantity }))
				.catch(err => console.log(err))
		} else {
			setProduct({ ...state, brandProductOutQ: 0 })
		}
	}, [state.brandProductOut])

	useEffect(() => {
		if (state.roomProductIn !== 'select') {
			!isOnload && getProductInCountApi('room', state.roomProductIn)
				.then(res => res && setProduct({ ...state, roomProductInQ: res.quantity }))
				.catch(err => console.log(err))
		} else {
			setProduct({ ...state, roomProductInQ: 0 })
		}
	}, [state.roomProductIn])

	useEffect(() => {
		if (state.roomProductOut !== 'select') {
			!isOnload && getProductOutCountApi('room', state.roomProductOut)
				.then(res => res && setProduct({ ...state, roomProductOutQ: res.quantity }))
				.catch(err => console.log(err))
		} else {
			setProduct({ ...state, roomProductOutQ: 0 })
		}
	}, [state.roomProductOut])

	useEffect(() => {
		getAverageRateApi('600', '10')
			.then(res => setCustomers(res))
			.catch(err => console.log(err))
	}, [])

	const handleChange = (key, value) => {
		setOnLoad(false)
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
					<BarGraph customers={customers} /></>}
		</>

	)
}
export default Dashboard;