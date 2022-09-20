import classes from "./LogoArea.module.css"

import logo from "../../../assets/Logo/EaseLogo.png"

function LogoArea() {
  return (
    <div>
      <div className={classes.icon}>
        <img src={logo} alt="?" />
        <span>이젠 미루지 말고 시작하세요</span>
        <span>당신을 위한 식단 서비스 </span>
      </div>
      <div className={`${classes.description} ${classes.text_gradient}`}>
        <div>Ea</div>
        <div>
          <span>sy</span>
        </div>
        <div>
          <span>Lo</span>
        </div>
        <div>se</div>
      </div>
    </div>
  )
}

export default LogoArea
