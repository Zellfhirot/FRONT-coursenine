import React from 'react';
import { useHistory } from "react-router-dom";
import "./Onboarding.css";
import Onboarding1 from '../../assets/img/Onboarding1.png'
import LogoCourseNine from '../../assets/img/logoCourseNine.svg'

const Onboarding = () => {
	const history = useHistory()

	return (
		<div className='bodyOnboarding'>
			<div className='illustration' onClick={() => history.push('/1')}>
				<div>
					<img className="imgOnboarding" src={Onboarding1} alt='' />
				</div>
				<div>
					<img className="logoOnboarding" src={LogoCourseNine} alt='' />
				</div>
			</div>
		</div>
	);
}

export default Onboarding;