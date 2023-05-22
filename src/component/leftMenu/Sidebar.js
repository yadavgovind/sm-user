import React from 'react';

/**
 * 
 */
const Sidebar = (props) => {
	const { showHideInventary, toggleInventary } = props;
	return <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
		<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
			<a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
				<span className="fs-5 d-none d-sm-inline">Menu</span>
			</a>
			<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
				<li>
					<a href="#customer" className="nav-link px-0 align-middle">
						<span className="ms-1 d-none d-sm-inline">Customer</span> </a>
				</li>
				<li className="nav-item">
					<a href="#room" className="nav-link align-middle px-0">
						<span className="ms-1 d-none d-sm-inline">Room</span>
					</a>
				</li>
				<li>
					<a href="#supplier" className="nav-link px-0 align-middle">
						<i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Supplier</span></a>
				</li>
				<li>
					<a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle" onClick={() => toggleInventary(!showHideInventary)}>
						<span className="ms-1 d-none d-sm-inline">Inventary</span> </a>
					<ul className={`collapse ${showHideInventary ? 'show' : ''} nav flex-column ml-30`} id="submenu1" data-bs-parent="#menu">
						<li className="w-100">
							<a href="#in-inventary" className="nav-link px-0"> <span className="d-none d-sm-inline">In Inventary</span> </a>
						</li>
						<li>
							<a href="#out-inventary" className="nav-link px-0"> <span className="d-none d-sm-inline">Out Inventary</span></a>
						</li>
					</ul>
				</li>
			</ul>
			<hr />
		</div>
	</div>;
}

export default Sidebar;