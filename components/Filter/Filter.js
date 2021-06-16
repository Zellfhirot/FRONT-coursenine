import React, { useState } from "react";
import ToggleButton from "../ToggleButton/ToggleButton"
import Button from "../../components/Button/Button";
import Close from '../../assets/icons/Close.svg'

import './Filter.css'

export default function Filter(props) {
  const [toggleBtn1, setToggleBtn1] = useState(0);
  const [toggleBtn2, setToggleBtn2] = useState(0);
  const [orderBy, setOrderBy] = useState(1);

  const btnText = {
    title1: "Bolsa de empleo",
    title2: "Certificado"
  }

  const updateTriggerBtn1 = (boolean) => {
    setToggleBtn1(boolean);
  };
  const updateTriggerBtn2 = (boolean) => {
    setToggleBtn2(boolean);
  };

  const orderByValue = (event) => setOrderBy(event.target.value);

  const handleFilterResults = () => {
    props.filterResults(toggleBtn1, toggleBtn2, orderBy);
    props.toggle()
  }

  return (

    <div className={`filtro-desplegable ${props.filter}`}>

      <div className='cabeceraBusqueda'>
        <h3>Filtra tu búsqueda</h3>
        <img className='closeSearch' src={Close} onClick={props.toggle} alt=""/>
      </div>

      <div className='filtrar'>
        <h3>Ordenado por:</h3>
        <div className='inputFiltrar'>
          <input
            type="radio"
            id="mPuntuados"
            name="course"
            value={1}
            onClick={orderByValue}
            defaultChecked
          />
          <label className='labelBuscador' htmlFor="mPuntuados">Mejor puntuados</label>
        </div>
        <div className='inputFiltrar'>
          <input
            type="radio"
            id="mRecientes"
            name="course"
            value={2}
            onClick={orderByValue}
          />
          <label className='labelBuscador' htmlFor="mRecientes">Más recientes</label>
        </div>
        <div className='inputFiltrar'>
          <input
            type="radio"
            id="mBaratos"
            name="course"
            value={3}
            onClick={orderByValue}
          />
          <label className='labelBuscador' htmlFor="mBaratos">Más baratos</label>
        </div>
      </div>

      <div className='filtrar'>
        <h3>Filtrar por:</h3>
        <ToggleButton toggleBtnText={btnText.title1} updateTriggerBtn={updateTriggerBtn1} />
        <ToggleButton toggleBtnText={btnText.title2} updateTriggerBtn={updateTriggerBtn2} />
      </div>

      <Button onClick={handleFilterResults} text={"Aplicar Filtros"} />
    </div>
  )
}