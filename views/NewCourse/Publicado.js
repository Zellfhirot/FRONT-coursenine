import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import tickSquare from "../../assets/icons/tickSquare.svg";

const Publicado = () => {
  const history = useHistory();

  const redirect = () => {
    history.push({ pathname: `/dashboard` })
  };

  return (
    <div className="bodyPassEstablecida">
      <div className="illustration">
        <div className="pick">
          <img className="imgPassEstablecida" src={tickSquare} alt="" />
        </div>
        <h2>Curso publicado<br /> correctamente</h2>
      </div>
      <Button onClick={redirect} text={"Volver"} />
    </div>
  );
};

export default Publicado;
