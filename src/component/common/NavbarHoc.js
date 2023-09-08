import React from 'react';

const NavbarHoc = ({ navbarArr, TableView }) => {
	return <div className="row">
		<div className="col-sm-12">
			<div className="cp-rightsection">
				<div className="right-section-tab">
					<div className="right-nav" id="stpperCall">
						<nav className="navbar navbar-expand-lg navbar-light mb-1">
							<div className="nav_inner">
								<div className="collapse navbar-collapse common-stepper">
									<ul className="navbar-nav">
										{navbarArr.map((item, i) => {
											return <li
												className="nav-item">
												<a
													href={item.link}
													className="nav-link">
													<span className="common-stepper-counter">{i + 1}</span>
													<span>
														{item.name}
													</span>
												</a>
											</li>
										})}
									</ul>
								</div>
							</div>
						</nav>
					</div>
				</div>
				<TableView />
			</div>
		</div>
	</div>;
}
export default NavbarHoc;