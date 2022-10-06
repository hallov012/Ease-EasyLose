import Html5QrcodePlugin from "../BarcodeComponent/Html5QrcodeScannerPlugin"
import { useEffect, useState } from "react"
import { instance } from "../../../api/index"
import { useDispatch } from "react-redux"
import { registerItem } from "../../../store/basketSlice"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

function BarcodeModal({ handleState }) {
  const dispatch = useDispatch()
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
              title: `${response.data[0].name}`,
              text: "수량을 입력해주세요",
              showCancelButton: true,
              confirmButtonText: "입력 완료",
              showLoaderOnConfirm: true,
              input: "range",
              inputAttributes: {
                min: 0.5,
                max: 10,
                step: 0.5,
              },
              padding: "2rem",
              inputValue: 1,
              confirmButtonColor: "#7c83fd",
              cancelButtonColor: "#00033f",
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
            handleState()
          } else {
            MySwal.fire({
              icon: "error",
              title: `죄송합니다!`,
              text: `바코드와 연계된 제품이 없습니다.`,
              showConfirmButton: false,
              timer: 1500,
            })
            handleState()
          }
        })
    }
  }, [lastResult])
  return (
    <div>
      <Html5QrcodePlugin
        fps={60}
        qrbox={{ width: 300, height: 150 }}
        disableFlip={false}
        qrCodeSuccessCallback={onScanSuccess}
      ></Html5QrcodePlugin>
    </div>
  )
}
export default BarcodeModal
