import classes from "./PickComplete.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";

function PickComplete(props) {
  return (
    <div className={classes.container}>
      <FontAwesomeIcon icon={faUserCheck} size="5x"></FontAwesomeIcon>
      <div>가입이 완료 되었습니다!</div>
      <div>다음과 같이 일일 영양소가 추천되었습니다.</div>
      <div className={classes.itemList}>
        <div className={classes.item}>
          <div>칼로리</div>
          <div>1500kcal</div>
        </div>
        <div className={classes.item}>
          <div>탄수화물</div>
          <div>40g</div>
        </div>
        <div className={classes.item}>
          <div>단백질</div>
          <div>50g</div>
        </div>
        <div className={classes.item}>
          <div>지방</div>
          <div>30g</div>
        </div>
      </div>
      <div>
        <div className={classes.button} onClick={() => {}}>
          일일 영양소 수정하기
        </div>
        <div
          className={classes.button}
          style={{
            background:
              "linear-gradient(90deg,var(--main-color) 44%,var(--light-color) 88%)",
            color: "white",
          }}
          onClick={() => {
            props.putUserInfo();
          }}
        >
          시작하기
        </div>
      </div>
    </div>
  );
}

export default PickComplete;
