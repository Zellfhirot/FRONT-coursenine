import React, { useState } from "react";

const ToggleButton = (props) => {

	const [toggleBtn, setToggleBtn] = useState(0);
	const handletriggerToggle = () => {
		setToggleBtn(toggleBtn === 0 ? 1 : 0)
		props.updateTriggerBtn(toggleBtn === 0 ? 1 : 0)
	}

	return (
		<>
			<div>
				<div onClick={handletriggerToggle} className={`wrg-toggle ${toggleBtn ? 'wrg-toggle--checked' : ''}`}>
					<div className="wrg-toggle-container">
						<div className="wrg-toggle-check">
						</div>
						<div className="wrg-toggle-uncheck">
						</div>
					</div>
					<div className="wrg-toggle-circle"></div>
					<input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
				</div>
				<label className="labelBuscador">{props.toggleBtnText}</label>
			</div>
		</>
	)
}

export default ToggleButton;