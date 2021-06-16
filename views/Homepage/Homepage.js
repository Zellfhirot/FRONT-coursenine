import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import fetchData from '../../hooks/Fetch'
import './Homepage.css'
import Menu from '../../components/Menu/Menu'
import MenuTeacher from '../../components/Menu/MenuTeacher'
import Burger from '../../assets/icons/Burger.svg'
import Arrow from '../../assets/icons/Arrow.svg'
import Search from '../../assets/icons/Search.svg'
import TinyBtn from '../../components/TinyBtn/TinyBtn'
import Media from '../../components/Media/Media'
import Backend from '../../assets/img/categories/backend01.jpg'
import Frontend from '../../assets/img/categories/frontend01.jpg'
import Web from '../../assets/img/categories/webdevelopment.jpg'
import Data from '../../assets/img/categories/datascience01.jpg'
import Market from '../../assets/img/categories/digitalmarketing.jpg'
import UXUI from '../../assets/img/categories/uxui01.jpg'
import LoginContext from '../../contexts/LoginContext/LoginContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation, Pagination]);

const Homepage = () => {
  const history = useHistory()
  const loginContext = useContext(LoginContext);
  const [cursos, setCursos] = useState([])
  const [docentes, setDocentes] = useState([])
  const [search, setSearch] = useState("")
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const fetching = async () => {
      let fetchOptions = {
        method: 'GET'
      }
      const content = await fetchData("searchAll", fetchOptions)
      if (content.error) {
        alert(content.error)
      } else {
        await content.ok && setCursos([...cursos, ...content.data.cursos]);
        await content.ok && setDocentes([...docentes, ...content.data.docentes]);
      }
    }
    fetching()
  }, [])

  useEffect(() => {
    if (loginContext.verified) {
      if (!loginContext.logged) {
        history.push("/login")
      }
    }
  }, [loginContext.verified])

  const Slider = () => {
    const cards = cursos.map(el => {
      return (
        <SwiperSlide >
          <div className={"slideCard"} onClick={() => history.push({
            pathname: `/cursos/${el.id}`,
            state: { curso: el, docente: docentes.filter(e => e.id === el.docente)[0] }
          })}>

            <div className="slideImg">
              <img className="courseImg" src={el.imagen} alt="" />
              <div className="slideMiniCard1">
                <TinyBtn key={el.id} text={docentes[0] && docentes.filter(e => e.id === el.docente)[0].nombre} color={"orange"} />
                <TinyBtn text={`${el.precio} €`} color={"green"} />
              </div>
            </div>
            <div className="slideMiniCard2">
              <h5>{el.nombre}</h5>
              <Media media={el.media} />
            </div>
          </div>
        </SwiperSlide>
      )
    })
    return (
      <Swiper
        spaceBetween={3}
        slidesPerView={1.5}
        loop={true}
        initialSlide={5}
      >
        {cards}
      </Swiper>
    );
  };

  const handleClick = (cat) => {
    history.push({
      pathname: `/categorias/${cat}`,
      state: {
        cursos: typeof (cat) == "number" ? cursos.filter(el => el.categoria === cat) : cursos,
        docentes: docentes
      }
    })
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const goSearch = () => {
    if (search !== "") {
      const filtered = cursos
        .filter(item => item.nombre.toLowerCase().includes(search.toLowerCase()))
      history.push({
        pathname: `/categorias/${search}`,
        state: {
          cursos: filtered,
          docentes: docentes,
        }
      })
    }
  }

  const toggleMenu = () => {
    setMenu(!menu)
  }

  const goBack = () => {
    history.goBack()
  }

  return (
    <>
      {loginContext.userRole === "estudiantes" ? <Menu toggle={toggleMenu} menu={menu} docentes={docentes} /> : <MenuTeacher toggle={toggleMenu} menu={menu} docentes={docentes} />}
      <div className="navHeader">
        <img onClick={goBack} src={Arrow} alt="" />
        <input type="text" placeholder="Haz tu búsqueda" onChange={handleSearch} />
        <img src={Search} alt="" onClick={goSearch} />
        <img onClick={toggleMenu} src={Burger} alt="" />
      </div>

      <div>
        <div className="slideHeader">
          <h3>Cursos más valorados</h3>
          <button type="button" onClick={() => handleClick('valorados')}>Ver todo</button>
        </div>
        {Slider()}
      </div>

      <div>
        <h3 className="gridTitle">Categorías</h3>
        <div className={`gridCategorias ${menu}`}>
          <div><img src={Web} alt="" onClick={() => handleClick(1)} /></div>
          <div><img src={Frontend} alt="" onClick={() => handleClick(2)} /></div>
          <div><img src={Backend} alt="" onClick={() => handleClick(3)} /></div>
          <div><img src={Market} alt="" onClick={() => handleClick(4)} /></div>
          <div><img src={UXUI} alt="" onClick={() => handleClick(5)} /></div>
          <div><img src={Data} alt="" onClick={() => handleClick(6)} /></div>
        </div>
      </div>
    </>
  )
}

export default Homepage;