import Star from '../../assets/icons/Star.svg'
import './Media.css'

const Media = (props) => {
  return (
    <div className="mediaStar">
      <h5 className="mediaNum" alt="">{props.media}&nbsp;&nbsp;</h5>
      <img src={Star} alt=""/>
    </div>
  )
}

export default Media