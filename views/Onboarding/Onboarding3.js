import React from 'react';
import { useHistory } from "react-router-dom";
import "./Onboarding.css";
import Button from "../../components/Button/Button";
import Onboarding4 from '../../assets/img/Onboarding4.png'
import Pagination3 from '../../assets/icons/Pagination3.svg'
import Arrow from '../../assets/icons/Arrow.svg'

const Onboarding3 = () => {
	const history = useHistory()

	const goUp = () => {
		history.push("/login");
	}

	return (
		<div className='bodyOnboarding'>
			<div className='onboardingHeader'>
				<img className="arrowOnboarding" src={Arrow} onClick={() => history.push('/2')} alt='' />
				<p className='textOmitir' onClick={() => history.push('/login')}>Omitir</p>
			</div>
			<div className='illustration'>
				<div>
					<img className="imgOnboarding" src={Onboarding4} alt='' />
				</div>
				<h2><span className='h2Green'>Transparencia</span></h2>
				<p className='textPresentation'>Información concreta y de confianza acerca de todos los cursos.</p>
				<img className="paginacionOnboarding" src={Pagination3} alt='' />
			</div>
			<Button onClick={goUp} text={"Terminar"} />
		</div>
	);
}

export default Onboarding3;