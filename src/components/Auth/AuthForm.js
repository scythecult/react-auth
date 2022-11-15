import { useState } from "react";
import { useHttp } from "../../hooks/hooks";
import { Message } from "../message/message";

import classes from "./AuthForm.module.css";
const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const SIGN_IN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

const AuthForm = () => {
  const [createUser, { isLoading: createUserLoading }] = useHttp({
    url: SIGN_UP_URL,
    method: "POST",
  });
  const [loginUser, { isLoading: loginLoading }] = useHttp({
    url: SIGN_IN_URL,
    method: "POST",
  });
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [wasSended, setWasSended] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (isLogin) {
      console.log("login existing user by comparing email/pass");
      loginUser({ email: emailValue, password: passValue, returnSecureToken: true }).then(
        (response) => {
          console.log(response);
          setMessage(response?.message);
          setWasSended(false);
        }
      );
    } else {
      console.log("creates new user");
      createUser({
        email: emailValue,
        password: passValue,
        returnSecureToken: true,
      }).then((errorData) => {
        setMessage(errorData?.message);
        setWasSended(false);
      });
    }

    setEmailValue("");
    setPassValue("");
    setWasSended(true);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            value={emailValue}
            type="email"
            id="email"
            required
            onChange={(evt) => setEmailValue(evt.target.value.trim())}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            value={passValue}
            type="password"
            id="password"
            required
            onChange={(evt) => setPassValue(evt.target.value.trim())}
          />
        </div>
        <div className={classes.control}>
          <Message MESSAGE_CODE={message} wasSended={wasSended} />
        </div>
        <div className={classes.actions}>
          {!createUserLoading && !loginLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {(createUserLoading || loginLoading) && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
