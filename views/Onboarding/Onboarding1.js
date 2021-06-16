import React from 'react';
import { useHistory } from "react-router-dom";
import "./Onboarding.css";
import Button from "../../components/Button/Button";
import Onboarding2 from '../../assets/img/Onboarding2.png'
import Pagination1 from '../../assets/icons/Pagination1.svg'
import Arrow from '../../assets/icons/Arrow.svg'

const Onboarding1 = () => {
	const history = useHistory()

	const goUp = () => {
		history.push("/2");
	}

	return (
		<div className='bodyOnboarding'>
			<div className='onboardingHeader'>
				<img className="arrowOnboarding" src={Arrow} onClick={() => history.push('/')} alt='' />
				<p className='textOmitir' onClick={() => history.push('/login')}>Omitir</p>
			</div>
			<div className='illustration'>
				<div>
					<img className="imgOnboarding" src={Onboarding2} alt='' />
				</div>
				<h2><span className='h2Green'>Cursos</span> digitales</h2>
				<p className='textPresentation'>Amplia variedad de los cursos digitales más demandados del momento.</p>
				<img className="paginacionOnboarding" src={Pagination1} alt='' />
			</div>
			<Button onClick={goUp} text={"Siguiente"} />
		</div>
	);
}

export default Onboarding1;