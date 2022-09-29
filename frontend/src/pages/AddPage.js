import { Route } from "react-router-dom"
import AddAmountPage from "../components/AddPage/pages/AddAmountPage"
import AddBarcodePage from "../components/AddPage/pages/AddBarcodePage"
import AddBasketPage from "../components/AddPage/pages/AddBasketPage"
import AddCustomPage from "../components/AddPage/pages/AddCustomPage"
import AddDetailPage from "../components/AddPage/pages/AddDetailPage"
import AddSearchPage from "../components/AddPage/pages/AddSearchPage"

function AddPage() {
  return (
    <div>
      <Route path="/add/search">
        <AddSearchPage></AddSearchPage>
      </Route>
      <Route path="/add/amount">
        <AddAmountPage></AddAmountPage>
      </Route>
      <Route path="/add/basket">
        <AddBasketPage></AddBasketPage>
      </Route>
      <Route path="/add/detail">
        <AddDetailPage></AddDetailPage>
      </Route>
      <Route path="/add/custom">
        <AddCustomPage></AddCustomPage>
      </Route>
      <Route path="/add/barcode">
        <AddBarcodePage></AddBarcodePage>
      </Route>
    </div>
  )
}

export default AddPage
