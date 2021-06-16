import React from "react";
import { useHistory } from "react-router-dom";
import "./PassEstablecida.css";
import Button from "../../components/Button/Button";
import tickSquare from "../../assets/icons/tickSquare.svg";

const RecuperarPass = () => {
  const history = useHistory();

  const redirect = () => {
    history.push("/dashboard");
  };

  return (
    <div className="bodyPassEstablecida">
      <div className="illustration">
        <div className="pick">
          <img className="imgPassEstablecida" src={tickSquare} alt="" />
        </div>
        <h2>Nueva contraseña<br/>establecida</h2>
      </div>
      <Button onClick={redirect} text={"Entrar en la aplicación"} />
    </div>
  );
};

export default RecuperarPass;
