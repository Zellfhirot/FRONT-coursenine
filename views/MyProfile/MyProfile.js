import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import fetchData from "../../hooks/Fetch";
import Arrow from '../../assets/icons/Arrow.svg'
import eyeOff from "../../assets/icons/eyeOff.svg";
import eyeOn from "../../assets/icons/eyeOn.svg";
import './MyProfile.css';
import LoginContext from '../../contexts/LoginContext/LoginContext';

const MyProfile = () => {
	const history = useHistory()
	const loginContext = useContext(LoginContext);
	const [eye, setEye] = useState(true);
	const [name, setName] = useState(loginContext.userName);
	const [email, setEmail] = useState(loginContext.userMail);
	const [pass, setPass] = useState("");
	const [rePass, setRepass] = useState("");

	useEffect(() => {
		if (loginContext.verified) {
			if (!loginContext.logged) {
				history.push("/login")
			}
		}
	}, [loginContext.verified])

	const handleName = (event) => setName(event.target.value);
	const handleEmail = (event) => setEmail(event.target.value);
	const handlePass = (event) => setPass(event.target.value);
	const handleRepass = (event) => setRepass(event.target.value);

	const fetching = async () => {
		if (pass === rePass) {
			let fetchOptions = {
				method: 'PUT',
				headers: {
					"content-type": "application/json",
					authorization: `Bearer: ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					nombre: name,
					email: email,
					pass: pass,
				})
			}
			const content = await fetchData("updateUser", fetchOptions)
			if (content.error) {
				alert(content.error)
			} else if (content.ok) {
				history.push({ pathname: "/dashboard" });;
				alert(content.msg)
			} else {
				alert(content.msg)
			}
		}
		else { alert("Las contraseñas no coinciden") }
	}

	const changeEye = () => {
		setEye(!eye)
	}

	return (
		<>
			<div className='bodyMyProfile'>
				<div className='newMyProfileHeader'>
					<img className="arrowOnboarding" src={Arrow} onClick={() => history.goBack()} alt='' />
				</div>

				<div className='textCabecera'>
					<h3>Mi perfil</h3>
				</div>
				<form className='formMyProfile'>
					<label className='textLabel' htmlFor="nombre" >Nombre y apellidos</label>
					<input required className='inputForm' type="text" name="nombre" onChange={handleName} defaultValue={loginContext.userName} minLength="4" maxLength="36"/>

					<label className='textLabel' htmlFor="email">Email</label>
					<input required className='inputForm' type="text" name="email" onChange={handleEmail} defaultValue={loginContext.userMail} maxLength="80"/>

					<label className='textLabel' htmlFor="pass">Password</label>
					<div className='passwordEye'>
						<input required className='inputFormPass' type={eye ? "password" : "text"} name="pass" onChange={handlePass} />
						<img className='eyeOff' src={eye ? eyeOff : eyeOn} onClick={changeEye} alt='' minLength="8" maxLength="50"/>
					</div>

					<label className='textLabel' htmlFor="rePass">Repetir password</label>
					<div className='passwordEye'>
						<input required className='inputFormPass' type={eye ? "password" : "text"} name="rePass" onChange={handleRepass} />
						<img className='eyeOff' src={eye ? eyeOff : eyeOn} onClick={changeEye} alt='' minLength="8" maxLength="50"/>
					</div>
				</form>
				<Button onClick={fetching} text={"Modificar perfil"} />
			</div>
		</>
	);
};

export default MyProfile;