import classes from "./LoginArea.module.css"
import LogoArea from "../LogoArea/LogoArea"
import SocialBtns from "../SocialBtns/SocialBtns"

function LoginArea() {
  return (
    <div className={classes.login__box}>
      <LogoArea />
      <SocialBtns />
    </div>
  )
}
export default LoginArea
