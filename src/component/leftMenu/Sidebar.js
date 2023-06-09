import React from 'react';

/**
 * 
 */
const Sidebar = (props) => {
	const { showHideInventory, toggleInventory, handleRoutes } = props;
	return <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
		<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
			<a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
				<span className="fs-5 d-none d-sm-inline">Menu</span>
			</a>
			<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
				<li>
					<button onClick={() => handleRoutes("#customer")} className="nav-link px-0 align-middle">
						<span className="ms-1 d-none d-sm-inline">Customer</span> </button>
				</li>
				<li className="nav-item">
					<button onClick={() => handleRoutes("#room")} className="nav-link align-middle px-0">
						<span className="ms-1 d-none d-sm-inline">Room</span>
					</button>
				</li>
				<li>
					<button onClick={() => handleRoutes("#supplier")} className="nav-link px-0 align-middle">
						<i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Supplier</span>
					</button>
				</li>
				<li>
					<a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle" onClick={() => toggleInventory(!showHideInventory)}>
						<span className="ms-1 d-none d-sm-inline">Inventory</span>
					</a>
					<ul className={`collapse ${showHideInventory ? 'show' : ''} nav flex-column ml-30`} id="submenu1" data-bs-parent="#menu">
						<li className="w-100">
							<button onClick={() => handleRoutes("#in-inventory")} className="nav-link px-0"> <span className="d-none d-sm-inline">In Inventory</span>  </button>
						</li>
						<li>
							<button onClick={() => handleRoutes("#out-inventory")} className="nav-link px-0"> <span className="d-none d-sm-inline">Out Inventory</span> </button>
						</li>
					</ul>
				</li>
			</ul>
			<hr />
		</div>
	</div>;
}

export default Sidebar;