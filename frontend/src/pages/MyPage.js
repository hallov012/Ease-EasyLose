import TopNavDate from "../components/TopNav/TopNavDate";
import { Route } from "react-router-dom";
import MyInfoPage from "../components/MyPage/pages/MyInfoPage";
import InfoModPage from "../components/MyPage/pages/InfoModPage";

function MyPage() {
  return (
    <div>
      <Route path="/mypage" exact>
        <MyInfoPage></MyInfoPage>
      </Route>
      <Route path="/mypage/mod">
        <InfoModPage></InfoModPage>
      </Route>
    </div>
  );
}

export default MyPage;
