import classes from "./AddBarcodePage.module.css"
import TopHistoryNav from "../../TopNav/TopHistoryNav"
import Html5QrcodePlugin from "../BarcodeComponent/Html5QrcodeScannerPlugin"
import { useEffect, useState } from "react"
import { instance } from "../../../api/index"
import { useDispatch } from "react-redux"
import { registerItem } from "../../../store/basketSlice"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

function AddBarcodePage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [lastResult, setLastResult] = useState("")
  const MySwal = withReactContent(Swal)
  function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) setLastResult(decodedText)
  }
  useEffect(() => {
    if (lastResult) {
      console.log(lastResult)
      instance
        .get("/food/barcode", { params: { barcode: lastResult } })
        .then((response) => {
          if (response.data[0]) {
            console.log("catch success!")

            MySwal.fire({
              icon: "success",
              title: `${response.data[0].name}이(가) 성공적으로 인식되었습니다!`,
              input: "text",
              inputAttributes: {
                autocapitalize: "off",
              },
              showCancelButton: true,
              confirmButtonText: "입력 완료",
              showLoaderOnConfirm: true,
              cancelButtonText: "취소",
              inputPlaceholder: "몇 인분 드시나요?",
              inputValue: 1,
              preConfirm: (count) => {
                if (isNaN(count))
                  Swal.showValidationMessage(`숫자를 입력해주세요!`)
                else return count
              },
            }).then((result) => {
              if (result.isConfirmed) {
                console.log(result)
                dispatch(
                  registerItem({
                    ...response.data[0],
                    count: Number(result.value),
                    listType: 2,
                  })
                )
              }
            })
            history.goBack()
          } else {
            MySwal.fire({
              icon: "error",
              title: `죄송합니다!
              바코드와 연계된 제품이 없습니다.`,
              showConfirmButton: false,
              timer: 1500,
            })
            history.goBack()
          }
        })
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
      <div className={classes.bcontainer}>
        <div className={classes.icon}>
          <i class="fa-solid fa-barcode fa-fw"></i>
        </div>
      </div>
    </div>
  )
}

export default AddBarcodePage
