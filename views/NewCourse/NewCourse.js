import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ToggleButton from "../../components/ToggleButton/ToggleButton"
import Button from "../../components/Button/Button";
import fetchData from "../../hooks/Fetch";
import Arrow from '../../assets/icons/Arrow.svg'
import './NewCourse.css';
import LoginContext from '../../contexts/LoginContext/LoginContext';

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const NewCourse = () => {
	const history = useHistory()
	const loginContext = useContext(LoginContext);
	const [allKeys, setAllKeys] = useState([]);
	const [allProfs, setAllProfs] = useState([]);
	const [name, setName] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [categoria, setCategoria] = useState(1);
	const [precio, setPrecio] = useState(0);
	const [duracion, setDuracion] = useState(0);
	const [bolsaEmpleo, setBolsaEmpleo] = useState(0);
	const [certificado, setCertificado] = useState(0);
	const [idioma, setIdioma] = useState(0);
	const [enlace, setEnlace] = useState("");
	const [imagen, setImagen] = useState("");
	const [keys, setKeys] = useState([]);
	const [profs, setProfs] = useState([]);

	useEffect(() => {
		const fetchKeysProfs = async () => {
			let fetchOptions = {
				method: 'GET'
			}
			const content = await fetchData("keys-profs", fetchOptions)
			if (content.error) {
				alert(content.error)
			} else {
				await content.ok && setAllKeys([...allKeys, ...content.keys]);
				await content.ok && setAllProfs([...allProfs, ...content.profs]);
			}
		}
		fetchKeysProfs()
	}, [])

	useEffect(() => {
		if (loginContext.verified) {
			if (!loginContext.logged || loginContext.userRole !== "docentes") {
				history.push("/login")
			}
		}
	}, [loginContext.verified])

	const handleName = (event) => setName(event.target.value);
	const handleDescription = (event) => setDescripcion(event.target.value);
	const handleLink = (event) => setEnlace(event.target.value);
	const handlePrice = (event) => setPrecio(event.target.value);
	const handleDuration = (event) => setDuracion(event.target.value);
	const handleLanguage = (event) => setIdioma(event.target.value);
	const handleCategory = (event) => setCategoria(event.target.value);
	const handleJob = (boolean) => setBolsaEmpleo(boolean);
	const handleCertificate = (boolean) => setCertificado(boolean);
	const handleImage = (event) => setImagen(event.target.value);

	const fetching = async () => {
		const curso = {
			nombre: name,
			descripcion: descripcion,
			enlace: enlace,
			precio: precio,
			duracion: duracion,
			idioma: idioma,
			categoria: categoria,
			bolsaEmpleo: bolsaEmpleo,
			certificado: certificado,
			imagen: imagen,
			fecha: Date.now(),
			keys: filterKeys(),
			profs: filterProfs()
		}
		let fetchOptions = {
			method: 'POST',
			headers: {
				"content-type": "application/json",
				authorization: `Bearer: ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify(curso)
		}
		const content = await fetchData("newCourse", fetchOptions)
		if (content.error) {
			alert(content.error)
		} else if (content.ok) {
			history.push({ pathname: '/publicado' })
		} else {
			alert(content.msg)
		}
	}

	function Autocompletes() {

		return (
			<>
				<Autocomplete
					multiple
					id="tags-filled"
					options={allKeys.map((option) => option.descripcion)}
					onChange={(event, newValue) => {
						if (typeof newValue === 'string') {
							setKeys({
								descripcion: newValue,
							});
						} else if (newValue && newValue.inputValue) {
							// Create a new value from the user input
							setKeys({
								descripcion: newValue.inputValue,
							});
						} else {
							setKeys(newValue);
						}
					}}
					freeSolo
					limitTags={3}
					renderTags={(value, getTagProps) =>
						value.map((option, index) => (
							<Chip variant="outlined" label={option} {...getTagProps({ index })} />
						))
					}
					renderInput={(params) => (
						<TextField {...params} variant="filled" label="Palabras clave" placeholder="Palabras clave" />
					)}
				/>
				<Autocomplete
					multiple
					id="tags-filled"
					options={allProfs.map((option) => option.descripcion)}
					onChange={(event, newValue) => {
						if (typeof newValue === 'string') {
							setProfs({
								descripcion: newValue,
							});
						} else if (newValue && newValue.inputValue) {
							// Create a new value from the user input
							setProfs({
								descripcion: newValue.inputValue,
							});
						} else {
							setProfs(newValue);
						}
					}}
					freeSolo
					limitTags={2}
					renderTags={(value, getTagProps) =>
						value.map((option, index) => (
							<Chip variant="outlined" label={option} {...getTagProps({ index })} />
						))
					}
					renderInput={(params) => (
						<TextField {...params} variant="filled" label="Perfiles profesionales" placeholder="Perfiles profesionales" />
					)}
				/>
			</>
		);
	}

	function filterKeys() {
		return keys.map(e => allKeys.filter(el => (e == el.descripcion) && el)[0] ? allKeys.filter(el => (e == el.descripcion) && el)[0] :
			{ id: null, descripcion: e })
	}

	function filterProfs() {
		return profs.map(e => allProfs.filter(el => (e == el.descripcion) && el)[0] ? allProfs.filter(el => (e == el.descripcion) && el)[0] :
			{ id: null, descripcion: e })
	}

	return (
		<>
			<div className='bodyNewCourse'>
				<div className='newCourseHeader'>
					<img className="arrowOnboarding" src={Arrow} onClick={() => history.goBack()} alt='' />
				</div>

				<div className='textCabecera'>
					<h3>Subir curso</h3>
				</div>
				<form className='formNewCourse'>
					<label className='textLabel' htmlFor="nombre">Nombre del curso</label>
					<input className='inputForm' type="text" name="nombre" onChange={handleName} maxLength="255" />

					<label className='textLabel' htmlFor="descripcion">Descripción del curso</label>
					<textarea className='textarea' type="text" name="descripcion" onChange={handleDescription} maxLength="850" />

					<label className='textLabel' htmlFor="categoria">Categoría</label>
					<select defaultValue="1" className='selectForm' name="categoria" id="categoria" onChange={handleCategory}>
						<option value="1">Desarrollo web</option>
						<option value="2">FrontEnd</option>
						<option value="3">BackEnd</option>
						<option value="4">Marketing Digital</option>
						<option value="5">UX/UI</option>
						<option value="6">Data Science</option>
					</select>

					<div className='divPriceAndTime'>
						<label htmlFor="precio">Precio</label>
						<input className='inputFormPq' pattern='/[0-9]/' type="text" name="precio" onChange={handlePrice} />
					</div>

					<div className='divPriceAndTime'>
						<label htmlFor="duracion">Duración</label>
						<input className='inputFormPq' type="text" name="duracion" onChange={handleDuration} />
					</div>

					<div className='divToggle'>
						<ToggleButton toggleBtnText={"  Bolsa de empleo"} updateTriggerBtn={handleJob} />
						<br />
						<ToggleButton toggleBtnText={"  Certificado oficial"} updateTriggerBtn={handleCertificate} />
					</div>

					<label className='textLabel' htmlFor="idioma">Idioma</label>
					<select defaultValue="0" className='selectForm' name="idioma" id="idioma" onChange={handleLanguage}>
						<option value="0">Español</option>
						<option value="1">Inglés</option>
					</select>

					<label className='textLabel' htmlFor="enlace">Link del curso</label>
					<input className='inputForm' type="text" name="enlace" onChange={handleLink} maxLength="255" />

					<label className='textLabel' htmlFor="imagen">Link de imagen</label>
					<input className='inputForm' type="text" name="imagen" onChange={handleImage} maxLength="255" />

					{Autocompletes()}

				</form>
				<Button onClick={fetching} text={"Publicar curso"} />
			</div>
		</>
	);
};

export default NewCourse;