import { useLocation, useHistory } from "react-router-dom"
import classes from "./ListItemCheckBox.module.css"
import { useState } from "react"
import { useDispatch } from "react-redux"

function ListItemCheckBox({ foodInfo, selected }) {
  const location = useLocation()
  const history = useHistory()
  const [added, setAdded] = useState(selected)
  const dispatch = useDispatch()

  const onClickHandler = () => {
    if (added) {
      setAdded(false)
    } else {
      history.push("/add/amount", { foodInfo: foodInfo })
      setAdded(true)
    }
  }

  return (
    <div
      className={classes.container}
      style={{ display: !selected && added ? "none" : "flex" }}
    >
      <div className={classes.left}>
        <div className={classes.item_title}>{foodInfo.name}</div>
        <div className={classes.item_subtitle}>{foodInfo.calorie}kcal</div>
      </div>
      <div className={classes.right}>
        <div
          onClick={() => {
            history.push("/add/detail", { foodInfo: foodInfo })
          }}
        >
          <i className="fa-regular fa-circle-question"></i>
        </div>
        <div onClick={onClickHandler}>
          <i className="fa-regular fa-square-plus"></i>
        </div>
      </div>
    </div>
    // <div
    //   style={{ display: !selected && added ? "none" : "flex" }}
    //   className={classes.container}
    // >
    //   <div
    //     onClick={() => {
    //       history.push("/add/detail", { foodInfo: foodInfo })
    //     }}
    //     className={classes.icontainer}
    //   >
    //     <div>{foodInfo.name}</div>
    //     <div className={classes.acontainer}>
    //       <div className={classes.amount}>{foodInfo.total_amount}</div>
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "row",
    //           justifyContent: "flex-start",
    //         }}
    //       >
    //         <div className={classes.calorie} style={{ marginRight: "4vw" }}>
    //           {foodInfo.calorie}kcal
    //         </div>
    //         <div></div>
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "flex-end",
    //         alignItems: "center",
    //       }}
    //     >
    //       {/* <input></input> */}

    //       {/* <div style={{ marginRight: "2vw" }}>
    //         <i class="fa-solid fa-plus"></i>
    //       </div>
    //       <div style={{ fontSize: 24, marginRight: "2vw" }}>{amount}</div>
    //       <div style={{ marginRight: "4vw" }}>
    //         <i class="fa-solid fa-minus"></i>
    //       </div> */}

    //       <div
    //         onClick={onClickHandler}
    //         style={{
    //           fontSize: 30,
    //           color: "var(--main-color)",
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         {added ? (
    //           <i className="fa-solid fa-circle-check"></i>
    //         ) : (
    //           <i class="fa-regular fa-circle-check"></i>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default ListItemCheckBox
