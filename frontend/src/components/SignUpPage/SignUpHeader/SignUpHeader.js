import SignUpProgressBar from "../SignUpProgressBar/SignUpProgressBar";
import classes from "./SignUpHeader.module.css";

function SignUpHeader(props) {
  return (
    <div className={classes.container}>
      <div className={classes.loader}>
        <i className={`${props.icon}`}></i>
        <div className={classes.shadow}></div>
      </div>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.progressbar}>
        <SignUpProgressBar done={props.done}></SignUpProgressBar>
      </div>
      {props.subtitle ? (
        <div className={classes.subtitle}>{props.subtitle}</div>
      ) : null}
    </div>
  );
}

export default SignUpHeader;
