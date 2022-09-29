import TopNavDate from "../components/TopNav/TopNavDate"
import { Route } from "react-router-dom"
import MyInfoPage from "../components/MyPage/pages/MyInfoPage"
import InfoModPage from "../components/MyPage/pages/InfoModPage"
import { useSelector } from "react-redux"
import ModWeightPage from "../components/MyPage/pages/ModWeightPage"
import ModHeightPage from "../components/MyPage/pages/ModHeightPage"
function MyPage() {
  const userInfo = useSelector((state) => state.user.userInfo)
  console.log("mypage" + userInfo)
  return (
    <div>
      <Route path="/mypage" exact>
        <MyInfoPage></MyInfoPage>
      </Route>
      <Route path="/mypage/mod" exact>
        <InfoModPage></InfoModPage>
      </Route>
      <Route></Route>
      <Route></Route>
      {/* <Route path="/mypage/mod/weight">
        <ModWeightPage weight={userInfo.weight}></ModWeightPage>
      </Route>
      <Route path="/mypage/mod/height">
        <ModHeightPage height={userInfo.height}></ModHeightPage>
      </Route> */}
      <Route></Route>
    </div>
  )
}

export default MyPage
