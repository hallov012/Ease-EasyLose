import SignUpProgressBar from "../SignUpProgressBar/SignUpProgressBar";
import classes from "./SignUpHeader.module.css";

function SignUpHeader(props) {
  return (
    <div>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.subtitle}>{props.subtitle}</div>
      <div style={{ width: "100vw", height: "5vh" }}>
        <SignUpProgressBar done={props.done}></SignUpProgressBar>
      </div>
      <div className={classes.notice}>{props.notice}</div>
    </div>
  );
}

export default SignUpHeader;
