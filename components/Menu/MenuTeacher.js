import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import fetchData from '../../hooks/Fetch';
import './Menu.css'
import ArrowWhite from '../../assets/icons/ArrowWhite.svg'
import Off from '../../assets/icons/Off.svg'
import LoginContext from '../../contexts/LoginContext/LoginContext';

export default function Menu(props) {
  const history = useHistory()
  const loginContext = useContext(LoginContext);

  const myProfile = () => {
    history.push({ pathname: "/miPerfil" });
  }

  const fetching = async () => {
    let fetchOptions = {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer: ${localStorage.getItem("token")}`
      },
    }
    const content = await fetchData(`logout`, fetchOptions)
    if (content.error) {
      alert(content.error)
    }
    if (content.ok) {
      localStorage.setItem("token", "")
      loginContext.toggleLogged(false)
      loginContext.toggleUserName("")
      loginContext.toggleUserMail("")
      loginContext.toggleUserRole("")
      history.push({ pathname: "/login" });
    } else {
      alert(content.msg)
    }
  }

  return (
    <div className={`menu-desplegable ${props.menu}`}>
      <div className="menuIcons">
        <img className="arrowImg" onClick={props.toggle} src={ArrowWhite} alt="" />
        <img className="offImg" onClick={fetching} src={Off} alt="" />
      </div>
      <div className="menuContent">
        <h1 onClick={myProfile}>Mi perfil</h1>
        <h1 onClick={() => console.log("MIS CURSOS")}>Mis cursos</h1>
        <h1 onClick={() => history.push("/nuevoCurso")}>Subir curso</h1>
      </div>
    </div>
  )
}