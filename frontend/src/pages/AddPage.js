import { Route, useHistory } from "react-router-dom"
import AddAmountPage from "../components/AddPage/pages/AddAmountPage"
import AddCustomPage from "../components/AddPage/pages/AddCustomPage"
import AddDetailPage from "../components/AddPage/pages/AddDetailPage"
import AddSearchPage from "../components/AddPage/pages/AddSearchPage"
import { useDispatch } from "react-redux"
import { registerLastEntered, registerTargetDate } from "../store/statusSlice"
import AddBundlePage from "../components/AddPage/pages/AddBundlePage"
import { useEffect } from "react"

function AddPage() {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("target_date"))
    if (temp) {
      dispatch(registerTargetDate(JSON.stringify(temp)))
    } else {
      history.push("/main")
    }

    const _temp = localStorage.getItem("mealtime")
    if (_temp) {
      dispatch(registerLastEntered(_temp))
    } else {
      history.push("/main")
    }
  }, [])

  return (
    <div style={{ width: "100%" }}>
      <Route path="/add/search">
        <AddSearchPage></AddSearchPage>
      </Route>
      <Route path="/add/amount">
        <AddAmountPage></AddAmountPage>
      </Route>
      <Route path="/add/detail">
        <AddDetailPage></AddDetailPage>
      </Route>
      <Route path="/add/custom">
        <AddCustomPage></AddCustomPage>
      </Route>
      <Route path="/add/bundle">
        <AddBundlePage></AddBundlePage>
      </Route>
    </div>
  )
}

export default AddPage
