import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import './ItemLista.css'
import timeConverter from '../../hooks/Date'
import '../TinyBtn/TinyBtn'
import Media from '../Media/Media';

const ItemLista = (props) => {
  const [curso, setCurso] = useState({})
  const history = useHistory()

  useEffect(() => {
    setCurso(props.elem)
  }, [])

  return (
    <div onClick={() => history.push({
      pathname: `/cursos/${curso.id}`,
      state: { curso: curso, docente: props.docente }
    })} className="listItem">
      <div className="imgBox">
        <img className="courseImg" src={curso.imagen} alt="" />
      </div>
      <div className="courseInfo">
        <div className="courseTitle">
          <h4>{curso.nombre}</h4>
        </div>
        <div className="courseSubInfo">
          <h6>{curso.precio} €</h6>
          <h6>{props.docente.nombre}</h6>
          <Media media={curso.media} />
          <p className="listaFecha">{timeConverter(curso.fecha)}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemLista