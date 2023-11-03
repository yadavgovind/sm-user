import React from 'react';

const Sidebar = (props) => {
	return <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{ backgroundColor: "#094681" }}>
		<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
			<a className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
				<span className="fs-5 d-none d-sm-inline">Menu</span>
			</a>
			<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
				<li>
					<a href="/store/dashboard" className="nav-link px-0 align-middle">
						<i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
					</a>
				</li>
				<li>
					<a href="/store/customer" className="nav-link px-0 align-middle">
						<span className="ms-1 d-none d-sm-inline">Customer</span>
					</a>
				</li>
				<li className="nav-item">
					<a href="/store/room" className="nav-link align-middle px-0">
						<span className="ms-1 d-none d-sm-inline">Room</span>
					</a>
				</li>
				<li className="nav-item">
					<a href="/store/settlement" className="nav-link align-middle px-0">
						<span className="ms-1 d-none d-sm-inline">Settlement</span>
					</a>
				</li>
			</ul>
			<hr />
		</div>
	</div>;
}

export default Sidebar;