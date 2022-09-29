import classes from "./AddBarcodePage.module.css";
import TopHistoryNav from "../../TopNav/TopHistoryNav";
import Html5QrcodePlugin from "../BarcodeComponent/Html5QrcodeScannerPlugin";

function AddBarcodePage() {
  function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
  }

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
        ></Html5QrcodePlugin>
      </div>
    </div>
  );
}

export default AddBarcodePage;
