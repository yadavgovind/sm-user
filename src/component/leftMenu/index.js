import React, { useState } from 'react';
import "./index.css"
import Sidebar from './Sidebar';
import Customer from '../customer';
const LeftMenu = () => {
	const [showHideInventary, toggleInventary] = useState(false)
	return <div>
		<div className="container-fluid">
			<div className="row flex-nowrap">
				<Sidebar showHideInventary={showHideInventary} toggleInventary={toggleInventary} />
				<div className="col py-3">
					<Customer />
				</div>
			</div>
		</div>
	</div>;
}

export default LeftMenu;