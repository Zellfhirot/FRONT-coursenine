import "./Button.css";

const Button = (props) => {
    return (
        <button className={`button ${props.class}`} onClick={() => props.onClick()} type="button">{`${props.text}`}</button>
    );
}

export default Button;