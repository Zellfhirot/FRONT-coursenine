import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import fetchData from '../../hooks/Fetch';
import Button from "../../components/Button/Button";
import Recuperar from '../../assets/img/Recuperar.png'
import eyeOff from "../../assets/icons/eyeOff.svg";
import eyeOn from "../../assets/icons/eyeOn.svg";
import LoginContext from '../../contexts/LoginContext/LoginContext';

const Actualizar = () => {
  const history = useHistory();
  const loginContext = useContext(LoginContext);
  const [typeOfUser, settypeOfUser] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [eye, setEye] = useState(true);
  const [functionFetch, setfunctionFetch] = useState(`newPass/${typeOfUser}`);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('tok');
    verifyToken(token)
  }, [])

  useEffect(() => {
    setfunctionFetch(`newPass/${typeOfUser}`);
  }, [typeOfUser])

  const handlePass = (event) => {
    setPass(event.target.value)
  };

  const handlePass2 = (event) => {
    setPass2(event.target.value)
  };

  const verifyToken = async (token) => {
    let fetchOptions = {
      method: 'GET'
    }
    const content = await fetchData(`reestablecer/${token}`, fetchOptions)
    if (content.error) {
      alert(content.error)
      history.push("/login")
    }
    if (content.ok) {
      alert(content.msg)
      localStorage.setItem("token", content.token)
      settypeOfUser(content.user.rol)
      setEmail(content.user.email)
      setName(content.user.nombre)
    } else {
      alert(content.msg)
      history.push("/login")
    }
  }

  const fetching = async () => {
    if (pass === pass2) {
      let fetchOptions = {
        method: 'PUT',
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer: ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ email: email, pass: pass, nombre: name })
      }
      const content = await fetchData(functionFetch, fetchOptions)
      if (content.error) { alert(content.error) }
      if (content.ok) {
        localStorage.setItem("token", content.token)
        loginContext.toggleLogged(true)
        loginContext.toggleUserName(content.user.nombre)
        loginContext.toggleUserMail(content.user.email)
        loginContext.toggleUserRole(content.user.rol)
        history.push("/actualizada");
      } else {
        alert(content.msg)
      }
    } else {
      alert("Las contraseñas no coinciden.")
    }
  }

  const changeEye = () => {
    setEye(!eye)
  }

  return (
    <form className="formVH">
      <div className="imgBoxVH">
        <img src={Recuperar} alt='' />
      </div>
      <h2>Tu nueva contraseña</h2>

      <div className='passwordEye'>
        <input
          required
          className='textPlaceholder'
          type={eye ? "password" : "text"}
          placeholder="Repite tu contraseña"
          onChange={handlePass}
          defaultValue=""
          minLength="8"
          maxLength="50"
        />
        <img className='eyeOff' src={eye ? eyeOff : eyeOn} onClick={changeEye} alt='' />
      </div>

      <div className='passwordEye'>
        <input
          required
          className='textPlaceholder'
          type={eye ? "password" : "text"}
          placeholder="Repite tu contraseña"
          onChange={handlePass2}
          defaultValue=""
          minLength="8"
          maxLength="50"
        />
        <img className='eyeOff' src={eye ? eyeOff : eyeOn} onClick={changeEye} alt='' />
      </div>
      <Button onClick={fetching} text={"Reestablecer contraseña"} />
    </form>
  );
}

export default Actualizar;