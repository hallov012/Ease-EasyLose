import classes from "./MyInfoPage.module.css";

function MyInfoPage() {
  return (
    <div className={classes.container}>
      <div className={classes.title}>마이페이지</div>
      <div className={classes.box}>
        <div className={classes.boxTitle}>
          <div style={{ fontSize: 16, fontWeight: 1000 }}>내 정보</div>
          <div style={{ fontSize: 14, color: "var(--main-color)" }}>편집</div>
        </div>
        <div className={classes.boxinfo}>
          <div className={classes.boxicon}>
            <i class="fa-solid fa-user"></i>
          </div>
          <div className={classes.userinfo}>
            <div className={classes.user_info_item}>
              <div>나이</div>
              <div>23세</div>
            </div>
            <div className={classes.user_info_item}>
              <div>체중</div>
              <div>56.6kg</div>
            </div>
            <div className={classes.user_info_item}>
              <div>신장</div>
              <div>162cm</div>
            </div>
          </div>
        </div>
        <div>
          <div className={classes.activity_and_goal}>
            <i className="fa-solid fa-person-running"></i>
            <div style={{ marginLeft: "2vw" }}>2~4시간 사이의 보통 활동</div>
          </div>
          <div className={classes.activity_and_goal}>
            <i className="fa-solid fa-seedling"></i>
            <div style={{ marginLeft: "2vw" }}>다이어트</div>
          </div>
        </div>
        <div className={classes.itemList}>
          <div className={classes.item}>
            <div style={{ fontWeight: 1000 }}>칼로리</div>
            <div>1500kcal</div>
          </div>
          <div className={classes.item}>
            <div style={{ fontWeight: 1000 }}>탄수화물</div>
            <div>40g</div>
          </div>
          <div className={classes.item}>
            <div style={{ fontWeight: 1000 }}>단백질</div>
            <div>50g</div>
          </div>
          <div className={classes.item}>
            <div style={{ fontWeight: 1000 }}>지방</div>
            <div>30g</div>
          </div>
        </div>
      </div>
      <div className={classes.box_logout}>
        <div>로그아웃</div>
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
  );
}

export default MyInfoPage;
