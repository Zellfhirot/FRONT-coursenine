import './TinyBtn.css'

const TinyBtn = (props) => {
  return (
    <h6 className={`tinyBtn ${props.color}`}>{props.text}</h6>
  )
}

export default TinyBtn;