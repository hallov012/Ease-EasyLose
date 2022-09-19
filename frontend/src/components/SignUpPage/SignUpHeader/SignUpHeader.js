import "./SignUpPage.module.css";

function SignUpHeader(props) {
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.subtitle}</div>
    </div>
  );
}

export default SignUpHeader;
