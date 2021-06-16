
import React from 'react';
import { useHistory } from "react-router-dom";
import "./PagError.css";
import Error from '../../assets/img/Error.png'
import Button from "../../components/Button/Button";

const PagError = () => {
	const history = useHistory()

	const goUp = () => {
		history.goBack();
	}

	return (
		<div className='bodyError'>
			<div className='illustration'>
				<div>
					<img className="imgError" src={Error} alt='' />
				</div>
				<h2><span className='h2error'>¡Oooops!</span></h2>
				<p className='textPresentation'>Algo salió mal, no encontramos la página que buscas.</p>
			</div>
			<Button onClick={goUp} text={"Volver a inicio"} />
		</div>
	);
}

export default PagError;