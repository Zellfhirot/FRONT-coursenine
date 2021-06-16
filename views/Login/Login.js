import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import fetchData from '../../hooks/Fetch';
import BtnRadio from '../../components/BtnRadio/BtnRadio';
import Button from "../../components/Button/Button";
import Login1 from '../../assets/img/Login1.png';
import eyeOff from "../../assets/icons/eyeOff.svg";
import eyeOn from "../../assets/icons/eyeOn.svg";
import LoginContext from '../../contexts/LoginContext/LoginContext';

const Login = () => {
    const [typeOfUser, settypeOfUser] = useState("estudiantes");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [eye, setEye] = useState(true);
    const [functionFetch, setfunctionFetch] = useState(`logUser/estudiantes`);
    const history = useHistory();
    const loginContext = useContext(LoginContext);

    useEffect(() => {
        setfunctionFetch(`logUser/${typeOfUser}`);
    }, [typeOfUser])

    const handleUser = (user) => settypeOfUser(user);
    const handleEmail = (event) => {
        setEmail(event.target.value)
    };
    const handlePass = (event) => {
        setPass(event.target.value)
    };

    const fetching = async () => {
        let fetchOptions = {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email: email, pass: pass })
        }
        const content = await fetchData(functionFetch, fetchOptions)
        if (content.error) { alert(content.error) }
        if (content.ok) {
            localStorage.setItem("token", content.token)
            loginContext.toggleLogged(true)
            loginContext.toggleUserName(content.user.nombre)
            loginContext.toggleUserMail(content.user.email)
            loginContext.toggleUserRole(content.user.rol)
            history.push("/dashboard");
        } else {
            alert(content.msg)
        }
    }

    const changeEye = () => {
        setEye(!eye)
      }

    return (
        <form className="formVH">
            <div className="imgBoxVH">
                <img src={Login1} alt='' />
            </div>
            <h2>Iniciar Sesión</h2>
            <BtnRadio handleUser={handleUser} />

            <input
                className='textPlaceholder'
                type="email"
                onChange={handleEmail}
                placeholder="Email"
                maxLength="80"
            />
            <div className='passwordEye'>
                <input
                    className='textPlaceholder'
                    type={eye ? "password" : "text"} 
                    placeholder="Password"
                    onChange={handlePass}
                    minLength="8"
                    maxLength="50"
                    required
                />
                <img className='eyeOff' src={eye ? eyeOff : eyeOn} onClick={ changeEye } alt='' />
             </div>
             <p>¿No recuerdas tu contraseña? <span className="linkSpan green" onClick={() => history.push('/recuperar')}>Recuperar</span></p>
            <Button onClick={fetching} text={"Iniciar sesión"} />
            <p> ¿Aún no estás registrado? <span className="linkSpan" onClick={() => history.push('/registro')}>Crear cuenta</span></p>
        </form>
    );
}

export default Login;