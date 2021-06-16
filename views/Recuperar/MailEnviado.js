import React from "react";
import { useHistory } from "react-router-dom";
import "./MailEnviado.css";
import RecuPass from "../../assets/icons/fluentMail.svg";
import Button from "../../components/Button/Button";
import Arrow from '../../assets/icons/Arrow.svg'

const MailEnviado = () => {
  const history = useHistory();

  return (
    <div className="bodyRecuPass">
      <div className='onboardingHeader'>
        <img className="arrowOnboarding" src={Arrow} onClick={() => history.push('/login')} alt='' />
      </div>
      <div className="illustration">
        <div>
          <img className="imgRecuPass" src={RecuPass} alt="" />
        </div>
        <h2>
          Link de recuperación<br />de contraseña enviada<br />a tu mail.
      </h2>
      </div>
      <Button onClick={() => history.push('/login')} text={"Volver a inicio"} />
    </div>
  );
};

export default MailEnviado;
