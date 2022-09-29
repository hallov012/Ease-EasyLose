import classes from "./AddBarcodePage.module.css"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import Html5QrcodePlugin from "../BarcodeComponent/Html5QrcodeScannerPlugin"
import { useEffect, useState } from "react"
import { instance } from "../../../api/index"
import axios from "axios"
import { useDispatch } from "react-redux"
import { registerItem } from "../../../store/basketSlice"
import { useHistory } from "react-router-dom"
import AddButtonList from "../AddButtonList/AddButtonList"

function AddBarcodePage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [lastResult, setLastResult] = useState("")
  function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) setLastResult(decodedText)
  }
  useEffect(() => {
    if (lastResult) {
      console.log(lastResult)
      axios
        .get(
          `https://openapi.foodsafetykorea.go.kr/api/sample/C005/json/1/5/BAR_CD=${lastResult}`,
          {}
        )
        .then((response) => {
          instance
            .get("/food", {
              params: { name: response.data["C005"]["row"][0]["PRDLST_NM"] },
            })
            .then((response) => {
              console.log("catch success!")
              dispatch(registerItem(response.data[0]))
              history.goBack()
              // console.log(response.data[0])
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => console.log(error))
    }
  }, [lastResult])

  return (
    <div>
      <div id="top_nav_area">
        <TopHistoryNav></TopHistoryNav>
      </div>
      <div className={classes.container}>
        <Html5QrcodePlugin
          fps={60}
          qrbox={{ width: 300, height: 150 }}
          disableFlip={false}
          qrCodeSuccessCallback={onScanSuccess}
          // qrCodeErrorCallback={(error) => {
          //   console.log(error)
          // }}
        ></Html5QrcodePlugin>
      </div>
    </div>
  )
}

export default AddBarcodePage
