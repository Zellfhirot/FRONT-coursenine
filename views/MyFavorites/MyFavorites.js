import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Arrow from '../../assets/icons/Arrow.svg'
import HeartBold from '../../assets/icons/HeartBold.svg'
import ItemLista from '../../components/ItemLista/ItemLista'
import fetchData from "../../hooks/Fetch";

const MyFavorites = () => {
	const history = useHistory()
	const location = useLocation()
	const [cursos, setCursos] = useState([])
	const [docentes, setDocentes] = useState([])

	useEffect(() => {
		if (location.state) {
			setDocentes(location.state.docentes)
		} else {
			history.push('/dashboard')
		}
	}, [])

	useEffect(() => {
		const fetching = async () => {
			let fetchOptions = {
				method: 'GET',
				headers: {
					"content-type": "application/json",
					authorization: `Bearer: ${localStorage.getItem("token")}`,
				}
			}
			const content = await fetchData("showFavs", fetchOptions)
			if (content.error) {
				alert(content.error)
			} else if (content.ok) {
				setCursos([...cursos, ...content.data]);
			} else {
				alert(content.msg)
			}
		}
		fetching()
	}, [])

	const drawList = () => {
		return cursos.map(el => <ItemLista key={el.id} elem={el} docente={docentes.filter(e => e.id == el.docente)[0]} />)
	}

	const goBack = () => {
		history.push("/dashboard")
	}

	return (
		<>
			<div className="menuIcons">
				<img onClick={goBack} src={Arrow} alt="" />
			</div>
			<div className="slideHeader">
				<h3>Mis cursos favoritos</h3>
				<img src={HeartBold} alt="" />
			</div>
			<div>
				{drawList()}
			</div>
		</>
	)
}

export default MyFavorites;