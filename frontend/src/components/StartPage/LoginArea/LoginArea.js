import classes from "./LoginArea.module.css"
import logo from "../../../assets/EaseLogo.png"

function LoginArea() {
  return (
    <div className={classes.login__box}>
      <img className={classes.icon} src={logo} alt="?" />
      <div className={classes.description}>
        <div>Ea</div>
        <div>
          <span>sy</span>
        </div>
        <div>
          <span>Lo</span>
        </div>
        <div>se</div>
      </div>
      <div clseeName={classes.content}></div>
    </div>
  )
}
export default LoginArea
