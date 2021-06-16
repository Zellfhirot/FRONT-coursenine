import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useLocation, useParams } from "react-router-dom";
import './Categoria.css';
import ItemLista from '../../components/ItemLista/ItemLista'
import Menu from '../../components/Menu/Menu'
import MenuTeacher from '../../components/Menu/MenuTeacher'
import Burger from '../../assets/icons/Burger.svg'
import Arrow from '../../assets/icons/Arrow.svg'
import Search from '../../assets/icons/Search.svg'
import Filter2 from '../../assets/icons/Filter2.svg'
import LoginContext from '../../contexts/LoginContext/LoginContext';

import Filter from '../../components/Filter/Filter'

const Categoria = (props) => {
  const loginContext = useContext(LoginContext);
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const [cursos, setCursos] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [docentes, setDocentes] = useState([])
  const [search, setSearch] = useState("")
  const [menu, setMenu] = useState(false)

  const [filter, setFilter] = useState(false)
  const toggleFilter = () => { setFilter(!filter) }

  const categorias = [
    "Desarrollo Web",
    "FrontEnd",
    "BackEnd",
    "Marketing Digital",
    "UX/UI",
    "Data Science"
  ]

  useEffect(() => {
    if (!location.state) {
      history.push('/dashboard')
    } else {
      setCursos(location.state.cursos)
      setDocentes(location.state.docentes)
    }
  }, [])

  useEffect(() => {
    if (loginContext.verified) {
      if (!loginContext.logged) {
        history.push("/login")
      }
    }
  }, [loginContext.verified])

  useEffect(() => {
    drawList()
  }, [filtrados])

  const drawList = () => {
    if (filtrados[0]) {
      return filtrados.map(el => <ItemLista key={el.id} elem={el} docente={docentes.filter(e => e.id == el.docente)[0]} />)
    } else {
      return cursos.map(el => <ItemLista key={el.id} elem={el} docente={docentes.filter(e => e.id == el.docente)[0]} />)
    }
  }

  const matchCategoria = () => {
    return categorias.filter((el, i) => i + 1 == params.categoria)[0]
  }

  const toggleMenu = () => {
    setMenu(!menu)
  }

  const goBack = () => {
    history.goBack()
  }

  const handleTitle = () => {
    if (params.categoria == 'valorados') {
      return <h3>Los más valorados</h3>
    } else if (params.categoria == 1 || params.categoria == 2 || params.categoria == 3 || params.categoria == 4 || params.categoria == 5 || params.categoria == 6) {
      return <h3> Cursos de {matchCategoria()} </h3 >
    } else {
      return <h3> Resultados de búsqueda </h3 >
    }
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const goSearch = () => {
    if (params.categoria == 'valorados' || params.categoria == 1 || params.categoria == 2 || params.categoria == 3 || params.categoria == 4 || params.categoria == 5 || params.categoria == 6) {
      const filtered = cursos
        .filter(item => item.nombre.toLowerCase().includes(search.toLowerCase()))
      setFiltrados(filtered)
    } else {
      // location.state.searchTotal()
    }
  }

  const filterResults = (bolsa, certif, orderBy) => {
    let trimmed = cursos
      .filter(e => {
        if (bolsa == 1) {
          return e.bolsaEmpleo == bolsa
        } else {
          return e
        }
      })
      .filter(e => {
        if (certif == 1) {
          return e.certificado == certif
        } else {
          return e
        }
      })
    setFiltrados(trimmed)
    if (orderBy == 1) {
      let ordered = trimmed.sort((a, b) => {
        if (a.media < b.media) {
          return 1;
        }
        if (a.media > b.media) {
          return -1;
        }
        return 0;
      })
      setFiltrados(ordered)
    } else if (orderBy == 2) {
      let ordered = trimmed.sort((a, b) => {
        if (a.fecha < b.fecha) {
          return 1;
        }
        if (a.fecha > b.fecha) {
          return -1;
        }
        return 0;
      })
      setFiltrados(ordered)
    } else if (orderBy == 3) {
      let ordered = trimmed.sort((a, b) => {
        if (a.precio > b.precio) {
          return 1;
        }
        if (a.precio < b.precio) {
          return -1;
        }
        return 0;
      })
      setFiltrados(ordered)
    }
  }

  return (
    <>
      <Filter toggle={toggleFilter} filter={filter} filterResults={filterResults} />
      {loginContext.userRole == "estudiantes" ? <Menu toggle={toggleMenu} menu={menu} docentes={docentes} /> : <MenuTeacher toggle={toggleMenu} menu={menu} docentes={docentes} />}
      <div className="navHeader">
        <img onClick={goBack} src={Arrow} alt="" />
        <input type="text" placeholder="Haz tu búsqueda" onChange={handleSearch} />
        <img src={Search} alt="" onClick={goSearch} />
        <img onClick={toggleMenu} src={Burger} alt="" />
      </div>

      <div className={`courseList ${menu} ${filter}`}>
        <div className="listHeader">
          {handleTitle()}
          <img onClick={toggleFilter} src={Filter2} alt="" />
        </div>
        <div>
          {drawList()}
        </div>
      </div>
    </>
  )
}

export default Categoria