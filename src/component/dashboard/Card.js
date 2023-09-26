import './index.css'
import Form from 'react-bootstrap/Form';

const CardItems = ({ title, backgroundImage, count }) => {
	return (<div className='col-2 card-width'>
		<div>
			<div className='title' style={{ backgroundImage }}>
				<div className='flex-block'>
					<div className='label'>
						{title}
					</div>
					<div className='icon'>
					</div>
				</div>
				<div className='flex-block'>
					<div className='mt-2'>
						<label className='sub-label'>Count</label>
						<div className='value'>{count || 0}</div>
						<div className='trend'>0%</div>
					</div>
					<div className='mt-2'>
						<label className='sub-label'>Cost</label>
						<div className='value'>$0</div>
						<div className='trend'>0%</div>
					</div>
				</div>
			</div>
		</div>
	</div>)
}
const Card = ({ dashboardCount, handleSelect }) => {

	return (
		<div className='main-content'>
			<div className='card cardSpace'>
				<div className='card-body'>
					<div className='flex-block ht-75'>
						<div>
							<h3 className="text-color boldfive fs-16">Project Statistics</h3>
						</div>
						<div className='select-box'>
							<h3 className='fs-16'>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
									<Form.Label>Year</Form.Label>
									<Form.Control
										as="select"
										aria-label="Default select example"
										onChange={(e) => handleSelect(e.target.value)}
									>
										<option key='2023' value={'2023'}>2023</option>
										<option key='2022' value={'2022'}>2022</option>
									</Form.Control>
								</Form.Group>
							</h3>
						</div>
					</div>
					<div className=''>
						<div className='row flex-box'>
							<CardItems
								backgroundImage="linear-gradient(40deg, rgb(39, 66, 143) 50%, rgb(61, 85, 155) 50%)"
								title='Total Customer'
								count={dashboardCount.customerCount}
							/>
							<CardItems
								backgroundImage="linear-gradient(40deg, rgb(249, 207, 71) 50%, rgb(255, 215, 85) 50%)"
								title='Total Product'
								count={dashboardCount.totalProductIn}
							/>
							<CardItems
								backgroundImage="linear-gradient(40deg, rgb(255, 116, 23) 50%, rgb(255, 130, 46) 50%)"
								title='Total In Out'
								count={dashboardCount.totalProductOut}
							/>
							<CardItems
								backgroundImage="linear-gradient(40deg, rgb(41, 174, 57) 50%, rgb(62, 181, 77) 50%)"
								title='Loan Amount'
								count={dashboardCount.loanAmount}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Card