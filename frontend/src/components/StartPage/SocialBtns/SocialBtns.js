import classes from "./SocialBtns.module.css"

import { ReactComponent as KakaoLogo } from "../../../assets/Logo/kakaotalk_logo.svg"
import { ReactComponent as GoogleLogo } from "../../../assets/Logo/google_logo.svg"
import { ReactComponent as NaverLogo } from "../../../assets/Logo/naver_logo.svg"

function SocialBtns() {
  return (
    <div>
      <span>소셜 로그인으로 시작하기</span>
      <div className={classes.btns__box}>
        <div className={classes.social__btn}>
          <KakaoLogo fill="#00033F" />
          <span>카카오</span>
        </div>
        <div className={classes.social__btn}>
          <GoogleLogo fill="#00033F" />
          <span>구글</span>
        </div>
        <div className={classes.social__btn}>
          <NaverLogo fill="#00033F" />
          <span>네이버</span>
        </div>
      </div>
    </div>
  )
}
export default SocialBtns
