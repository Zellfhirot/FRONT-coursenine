import './TinyBtn.css'
import StarWhite from '../../assets/icons/StarWhite.svg'

const TinyMedia = (props) => {
  return (
    <div className="mediaStar tinyMedia">
      <h6 className="tinyMedia">{props.media}&nbsp;&nbsp;</h6>
      <img src={StarWhite} alt=""/>
      <h6 className="tinyMedia">&nbsp;&#40;{props.num} Reviews&#41;</h6>
    </div>
  )
}

export default TinyMedia;