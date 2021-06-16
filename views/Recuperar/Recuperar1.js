import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import fetchData from '../../hooks/Fetch';
import Arrow from '../../assets/icons/Arrow.svg'
import BtnRadio from '../../components/BtnRadio/BtnRadio';
import Button from "../../components/Button/Button";
import "./Recuperar1.css";
import Recuperar from '../../assets/img/Recuperar.png'

const Recuperar1 = () => {
	const [typeOfUser, settypeOfUser] = useState("estudiantes");
	const [email, setEmail] = useState("");
	const [functionFetch, setfunctionFetch] = useState(`recuperar/${typeOfUser}`);
	const history = useHistory();

	useEffect(() => {
		setfunctionFetch(`recuperar/${typeOfUser}`);
	}, [typeOfUser])

	const handleUser = (user) => settypeOfUser(user);
	const handleEmail = (event) => {
		setEmail(event.target.value)
	};

	const fetching = async () => {
		let fetchOptions = {
			method: 'POST',
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email: email })
		}
		const content = await fetchData(functionFetch, fetchOptions)
		if (content.error) { alert(content.error) }
		if (content.ok) {
			history.push("/mailenviado");
		} else {
			alert(content.msg)
		}
	}

	return (
		<form className="formVH">
			<div className='newMyProfileHeader'>
				<img className="arrowOnboarding" src={Arrow} onClick={() => history.goBack()} alt='' />
			</div>
			<div className="imgBoxVH">
				<img src={Recuperar} alt='' />
			</div>
			<h2>Recuperar contraseña</h2>
			<BtnRadio handleUser={handleUser} />
			<p className="textPresentation">Escribe el correo electrónico con el que registraste tu cuenta y te enviaremos un link de recuperación.</p>
			<input type="email" onChange={handleEmail} placeholder="Email" maxLength="80"/>
			<div className="inputButton">
				<Button onClick={fetching} text={"Enviar correo"} />
			</div>
		</form>
	);
}

export default Recuperar1;