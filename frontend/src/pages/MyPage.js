import { Route } from "react-router-dom"
import MyInfoPage from "../components/MyPage/pages/MyInfoPage"
import InfoModPage from "../components/MyPage/pages/InfoModPage"
import { useSelector } from "react-redux"
import ModWeightPage from "../components/MyPage/pages/ModWeightPage"
import ModHeightPage from "../components/MyPage/pages/ModHeightPage"
import ModAgePage from "../components/MyPage/pages/ModAgePage"
import ModGoalPage from "../components/MyPage/pages/ModGoalPage"
import ModActivityLevelPage from "../components/MyPage/pages/ModActivityLevelPage"
import ModNutPage from "../components/MyPage/pages/ModNutPage"
function MyPage() {
  const userInfo = useSelector((state) => state.user.userInfo)
  return (
    <div>
      <Route path="/mypage" exact>
        <MyInfoPage></MyInfoPage>
      </Route>
      <Route path="/mypage/mod" exact>
        <InfoModPage></InfoModPage>
      </Route>
      <Route path="/mypage/mod/goal">
        <ModGoalPage></ModGoalPage>
      </Route>
      <Route path="/mypage/mod/age">
        <ModAgePage></ModAgePage>
      </Route>
      <Route path="/mypage/mod/weight">
        <ModWeightPage></ModWeightPage>
      </Route>
      <Route path="/mypage/mod/height">
        <ModHeightPage></ModHeightPage>
      </Route>
      <Route path="/mypage/mod/activity">
        <ModActivityLevelPage></ModActivityLevelPage>
      </Route>
      <Route path="/mypage/mod/nut">
        <ModNutPage></ModNutPage>
      </Route>
    </div>
  )
}

export default MyPage
