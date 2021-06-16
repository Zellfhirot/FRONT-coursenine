import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import './Detalle.css';
import fetchData from '../../hooks/Fetch'
import ArrowWhite from '../../assets/icons/ArrowWhite.svg'
import Heart from '../../assets/icons/Heart.svg'
import CheckAll from '../../assets/icons/CheckAll.svg'
import accessTime from '../../assets/icons/accessTime.svg'
import language from '../../assets/icons/language.svg'
import TinyBtn from '../../components/TinyBtn/TinyBtn'
import Button from '../../components/Button/Button'
import SimpleAccordion from '../../components/Accordion/Accordion'
import Media from '../../components/Media/Media'
import TinyMedia from '../../components/TinyBtn/TinyMedia'
import LoginContext from '../../contexts/LoginContext/LoginContext';

const Detalle = (props) => {
  const loginContext = useContext(LoginContext);
  const location = useLocation()
  const history = useHistory()
  const [curso, setCurso] = useState({})
  const [jobs, setJobs] = useState([])
  const [tags, setTags] = useState([])
  const [salaries, setSalaries] = useState([])
  const [professions, setProfessions] = useState([])
  const [reviews, setReviews] = useState([])
  const [reviewNum, setReviewNum] = useState(0)

  useEffect(() => {
    if (!location.state) {
      history.push('/dashboard')
    } else {
      setCurso(location.state.curso)
      fetching()
    }
  }, [])

  useEffect(() => {
    if (loginContext.verified) {
      if (!loginContext.logged) {
        history.push("/login")
      }
    }
  }, [loginContext.verified])

  const fetching = async () => {
    let fetchOptions = {
      method: 'GET'
    }
    const content = await fetchData(`dataAPI/${location.state.curso.id}`, fetchOptions)
    if (content.error) {
      alert(content.error)
    } else if (content.ok) {
      await content.ok && setJobs(content.APIresponse.tags)
      await content.ok && setSalaries(content.APIresponse.professions)
      await content.ok && setTags(content.keywords)
      await content.ok && setProfessions(content.professions)
      await content.ok && setReviews(content.reviews)
      await content.ok && setReviewNum(content.reviewNum)
    } else if (!content.ok) {
      alert(content.msg)
    }
  }

  const fetchNewFav = async () => {
    if (loginContext.userRole === "estudiantes") {
      let fetchOptions = {
        method: 'POST',
        headers: {
          "authorization": `Bearer: ${localStorage.getItem("token")}`
        }
      }
      const content = await fetchData(`newFav/${location.state.curso.id}`, fetchOptions)
      if (content.error) {
        alert(content.error)
      } else if (content.ok) {
        alert(content.msg)
      } else if (!content.ok) {
        alert(content.msg)
      }
    }
  }

  const goBack = () => {
    history.goBack()
  }

  const scraping = () => {
    let job = jobs.map((el, i) => <p>Para {tags[i]} hay {el} ofertas de trabajo semanales en España.</p>)
    let sals = salaries.map((el, i) => <p>El trabajo de {professions[i]} tiene un salario medio de {el}€ en Madrid. </p>)

    return (
      <>
        <h3 className="whiteH3">Datos de empleo</h3>
        {job}
        {sals}
      </>
    )
  }

  const extra = () => {
    const bolsa = () => <div className="infoImg">
      <img src={CheckAll} alt="" />
      <p>Bolsa de empleo</p>
    </div>

    const certif = () => <div className="infoImg">
      <img src={CheckAll} alt="" />
      <p>Certificado</p>
    </div>

    return (
      <>
        <div className="infoImg">
          <img src={accessTime} alt="" />
          <p>{curso.duracion} horas</p>
        </div>
        <div className="infoImg">
          <img src={language} alt="" />
          <p>{curso.idioma === 0 ? "Español" : "Inglés"}</p>
        </div>
        {curso.bolsaEmpleo === 1 && bolsa()}
        {curso.certificado === 1 && certif()}
      </>
    )
  }

  const notaMedia = () => {
    return reviews.length !== 0 ? Math.round((reviews.map(el => el.valoracion).reduce((a, b) => a + b, 0) / reviews.length + Number.EPSILON) * 100) / 100 : curso.media
  }

  return (
    <>
      <div className="imgDetail">
        <img className="arrowImg" onClick={goBack} src={ArrowWhite} alt="" />
        <img className="heartImg" onClick={fetchNewFav} src={Heart} alt="" />
        <div className="infoBox">
          <TinyMedia media={notaMedia()} color={"blue"} num={reviewNum} />
          <div className="subInfo">
            {location.state && <TinyBtn text={location.state.docente.nombre} color={"orange"} />}
            <TinyBtn text={`${curso.precio} €`} color={"green"} />
          </div>
        </div>
        <img className="courseImg detail" src={curso.imagen} alt="" />
      </div>
      <div className="courseDescription">
        <h3>{curso.nombre}</h3>
        <p>{curso.descripcion}</p>
      </div>
      <div className="jobsInfo">
        {jobs ? scraping() : <p>No hay datos</p>}
      </div>
      <div className="extraInfo">
        {extra()}
      </div>
      <div className="buttonBox">
        <Button onClick={() => window.open(curso.enlace)} text={"Visitar curso"} />
      </div>
      <div className="reviewBox">
        <h2>Opiniones de usuarios</h2>
        <Media media={notaMedia()} />
        <SimpleAccordion reviews={reviews} />
        <Button onClick={() => history.push(`/review/${curso.id}`)} text={"Publicar opinión"} class={"invert"} />
      </div>

    </>
  )
}

export default Detalle