import React from 'react';
import { useHistory } from "react-router-dom";
import "./Onboarding.css";
import Button from "../../components/Button/Button";
import Onboarding3 from '../../assets/img/Onboarding3.png'
import Pagination2 from '../../assets/icons/Pagination2.svg'
import Arrow from '../../assets/icons/Arrow.svg'

const Onboarding2 = () => {
    const history = useHistory()

    const goUp = () => {
        history.push("/3");
      }

    return (
        <div className='bodyOnboarding'>
            <div className='onboardingHeader'>
                <img className="arrowOnboarding" src={Arrow} onClick={() => history.push('/1')} alt='' />
                <p className='textOmitir' onClick={() => history.push('/login')}>Omitir</p>
            </div>
            <div className='illustration'>
                <div>
                    <img className="imgOnboarding" src={Onboarding3} alt='' />
                </div>
                <h2>Cursos <span className='h2Green'>digitales</span> </h2>
                <p className='textPresentation'>Información en tiempo real de la realidad laboral relacionada con cada curso.</p>
                <img className="paginacionOnboarding" src={Pagination2} alt='' />
            </div>
            <Button onClick={goUp} text={"Siguiente"} />
        </div>
        );
    }

export default Onboarding2;