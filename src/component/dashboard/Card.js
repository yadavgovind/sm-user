import './index.css'
const Card = () => {
	return (
		<div className='main-content'>
			<div className='card cardSpace'>
				<div className='card-body'>
					<div className='flex-block ht-75'>
						<div>
							<h3 className="text-color boldfive fs-16">Project Statistics</h3>
						</div>
						<div className='select-box'>
							<h3 className='fs-16'>Calender</h3>
						</div>
					</div>
					<div className=''>
						<div className='row flex-box'>
							<div className='col-2 card-width'>
								<div>
									<div className='title' style={{ backgroundImage: "linear-gradient(40deg, rgb(39, 66, 143) 50%, rgb(61, 85, 155) 50%)" }}>
										<div className='flex-block'>
											<div className='label'>
												Total Customer
											</div>
											<div className='icon'>
											</div>
										</div>
										<div className='flex-block'>
											<div className='mt-2'>
												<label className='sub-label'>Count</label>
												<div className='value'>0</div>
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
							</div>
							<div className='col-2 card-width'>
								<div>
									<div className='title' style={{ backgroundImage: "linear-gradient(40deg, rgb(249, 207, 71) 50%, rgb(255, 215, 85) 50%)" }}>
										<div className='flex-block'>
											<div className='label'>
												Total Product
											</div>
											<div className='icon'>
											</div>
										</div>
										<div className='flex-block'>
											<div className='mt-2'>
												<label className='sub-label'>Count</label>
												<div className='value'>0</div>
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
							</div>
							<div className='col-2 card-width'>
								<div>
									<div className='title' style={{ backgroundImage: "linear-gradient(40deg, rgb(255, 116, 23) 50%, rgb(255, 130, 46) 50%)" }}>
										<div className='flex-block'>
											<div className='label'>
												Total In Out
											</div>
											<div className='icon'>
											</div>
										</div>
										<div className='flex-block'>
											<div className='mt-2'>
												<label className='sub-label'>Count</label>
												<div className='value'>0</div>
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
							</div>
							<div className='col-2 card-width'>
								<div>
									<div className='title' style={{ backgroundImage: "linear-gradient(40deg, rgb(41, 174, 57) 50%, rgb(62, 181, 77) 50%)" }}>
										<div className='flex-block'>
											<div className='label'>
												Store Status
											</div>
											<div className='icon'>
											</div>
										</div>
										<div className='flex-block'>
											<div className='mt-2'>
												<label className='sub-label'>Count</label>
												<div className='value'>0</div>
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Card