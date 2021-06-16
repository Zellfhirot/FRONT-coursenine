import './BtnRadio.css'

const BtnRadio = (props) => {

  const handleClick = (e) => {
    props.handleUser(e.target.value)
  }

  return (
    <div className="userType">
      <input className="userType" onClick={handleClick} type="radio" name="userType" id="docente" value="docentes" />
      <label htmlFor="docente" className="label-radio docente">Docente</label>

      <input className="userType" onClick={handleClick} type="radio" name="userType" id="estudiante" value="estudiantes" defaultChecked />
      <label htmlFor="estudiante" className="label-radio estudiante">Estudiante</label>
    </div>
  )
}

export default BtnRadio;