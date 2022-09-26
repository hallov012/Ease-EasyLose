import TopNavDate from "../components/TopNav/TopNavDate";
import { Route } from "react-router-dom";
import MyInfoPage from "../components/MyPage/pages/MyInfoPage";
import InfoModPage from "../components/MyPage/pages/InfoModPage";
import { useSelector } from "react-redux";
function MyPage() {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div>
      <Route path="/mypage" exact>
        <MyInfoPage userInfo={userInfo}></MyInfoPage>
      </Route>
      <Route path="/mypage/mod">
        <InfoModPage userInfo={userInfo}></InfoModPage>
      </Route>
    </div>
  );
}

export default MyPage;
