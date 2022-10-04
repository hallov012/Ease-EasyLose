import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode"
import React, { useEffect, useState } from "react"

const qrcodeRegionId = "html5qr-code-full-region"

class Html5QrcodePlugin extends React.Component {
  render() {
    return <div id={qrcodeRegionId} style={{ width: "100%" }} />
  }

  componentWillUnmount() {
    // TODO(mebjas): See if there is a better way to handle
    //  promise in `componentWillUnmount`.
    this.html5QrcodeScanner.clear().catch((error) => {
      console.error("Failed to clear html5QrcodeScanner. ", error)
    })
  }

  componentDidMount() {
    // Creates the configuration object for Html5QrcodeScanner.

    const formatsToSupport = [
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.EAN_8,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
      Html5QrcodeSupportedFormats.ITF,
    ]
    function createConfig(props) {
      var config = {}
      if (props.fps) {
        config.fps = props.fps
      }
      if (props.qrbox) {
        config.qrbox = props.qrbox
      }
      if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio
      }
      if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip
      }
      config.rememberLastUsedCamera = false
      config.formatsToSupport = formatsToSupport
      return config
    }

    var config = createConfig(this.props)
    var verbose = this.props.verbose === true

    // Suceess callback is required.
    if (!this.props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback."
    }

    this.html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    )
    this.html5QrcodeScanner.render(
      this.props.qrCodeSuccessCallback,
      this.props.qrCodeErrorCallback
    )
  }
}

// function Html5QrcodePlugin(props) {
//   const qrcodeRegionId = "html5qr-code-full-region"

//   const formatsToSupport = [
//     Html5QrcodeSupportedFormats.EAN_13,
//     Html5QrcodeSupportedFormats.EAN_8,
//     Html5QrcodeSupportedFormats.UPC_A,
//     Html5QrcodeSupportedFormats.UPC_E,
//     Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
//     Html5QrcodeSupportedFormats.ITF,
//   ]

//   const [obj, setObj] = useState(undefined)

//   useEffect(() => {
//     setObj(
//       new Html5QrcodeScanner(
//         qrcodeRegionId,
//         {
//           fps: props.fps,
//           qrbox: props.qrbox,
//           aspectRatio: props.aspectRatio,
//           disableFlip: props.disableFlip,
//           rememberLastUsedCamera: true,
//           formatsToSupport: formatsToSupport,
//         },
//         true
//       )
//     )
//     return () => {
//       if (obj) {
//         obj.clear()
//         console.log("video clear")
//       }
//     }
//   }, [])

//   useEffect(() => {
//     if (obj) {
//       obj.render(
//         (response) => {
//           console.log(response)
//         },
//         (error) => {
//           console.log(error)
//         }
//       )
//     }
//   }, [obj])

//   return <div id={qrcodeRegionId}></div>
// }

export default Html5QrcodePlugin
