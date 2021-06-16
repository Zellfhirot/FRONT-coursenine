import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import tickSquare from '../../assets/icons/tickSquare.svg';
import { CircularProgress } from '@material-ui/core';
import './EnterApp.css'

const EnterApp = () => {
	const history = useHistory()

	useEffect(() => {
		setTimeout(() => {
			history.push('/dashboard')
		}, 3000);
	}, [])

	return (
		<div className='bodyOnboarding'>
			<div className='iconOk'>
				<div>
					<img className="checkOk" src={tickSquare} alt='' />
				</div>
				<h2>Cuenta creada<br /><span className='h2Green'>correctamente</span></h2>
			</div>
			<CircularProgress disableShrink className="arrowOnboarding" />
			<p className='textPresentation'>Preparando tu<br />experiencia educativa</p>
		</div>
	);
}

export default EnterApp;