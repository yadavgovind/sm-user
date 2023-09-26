import React from 'react';
import Form from 'react-bootstrap/Form';
const ProductFilter = ({ roomsArr, productType, product, handleChange }) => {
	const getProductTpyes = () => {
		let options = []
		productType.map(item => {
			return options.push(<option key={item.productId} value={item.productId}>{item.productType}{' '}{item.productSize}</option>)

		})
		return options
	}
	const getRooms = () => {
		let options = []
		roomsArr.length && roomsArr.map((item, i) => {
			return options.push(<option key={i} value={item}>{item}</option>)

		})
		return options
	}
	return <div className='main-content'>
		<div className='card cardSpace'>
			<div className='card-body'>
				<div className='flex-block ht-50'>
					<div>
						<h3 className="text-color boldfive fs-16">Product Count</h3>
					</div>
				</div>
				<div className=''>
					<div className='row flex-box'>
						<div className='w-30 pro-h'>
							Based on Brand
						</div>
						<div className='w-30 pro-h'>
							Based on Room
						</div>
					</div>
					<div className='row flex-box'>
						<div className='w-15'>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
								<Form.Label>Product In </Form.Label>
								<Form.Control
									as="select"
									aria-label="Default select example"
									onChange={(e) => handleChange('brandProductIn', e.target.value)}
								>
									{getProductTpyes()}
								</Form.Control>
							</Form.Group>
							<Form.Group className="mb-3 product-filter" >
								<Form.Label>{product.brandProductInQ || 0}</Form.Label>
							</Form.Group>
						</div>
						<div className='w-15'>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
								<Form.Label>Product Out </Form.Label>
								<Form.Control
									as="select"
									aria-label="Default select example"
									onChange={(e) => handleChange('brandProductOut', e.target.value)}
								>
									{getProductTpyes()}
								</Form.Control>
							</Form.Group>
							<Form.Group className="mb-3 product-filter" >
								<Form.Label>{product.brandProductOutQ || 0}</Form.Label>
							</Form.Group>
						</div>
						<div className='w-15'>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
								<Form.Label>Product In </Form.Label>
								<Form.Control
									as="select"
									aria-label="Default select example"
									onChange={(e) => handleChange('roomProductInQ', e.target.value)}
								>
									{getRooms()}
								</Form.Control>
							</Form.Group>
							<Form.Group className="mb-3 product-filter" >
								<Form.Label>{product.brandProductInQ || 0}</Form.Label>
							</Form.Group>
						</div>
						<div className='w-15'>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
								<Form.Label>Product Out </Form.Label>
								<Form.Control
									as="select"
									aria-label="Default select example"
									onChange={(e) => handleChange('roomProductOutQ', e.target.value)}
								>
									{getRooms()}
								</Form.Control>
							</Form.Group>
							<Form.Group className="mb-3 product-filter" >
								<Form.Label>{product.brandProductOutQ || 0}</Form.Label>
							</Form.Group>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>;
}

export default ProductFilter;