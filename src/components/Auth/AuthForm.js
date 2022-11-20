import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../features/user-auth-slice";
import { useHttp } from "../../hooks/hooks";
import { Message } from "../message/message";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const dispatch = useDispatch();
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

  const wasSended = createUserLoading || loginLoading;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const userData = { email: emailValue, password: passValue, returnSecureToken: true };

    if (isLogin) {
      console.log("login existing user by comparing email/pass");
      loginUser(userData).then((response) => {
        if (response?.errors?.length) {
          setMessage(response?.message);
        } else {
          dispatch(logIn());
        }
      });
    } else {
      console.log("creates new user");
      createUser(userData).then((response) => {
        if (response?.errors?.length) {
          setMessage(response?.message);
        } else {
          dispatch(logIn());
        }
      });
    }

    setMessage("");
    setEmailValue("");
    setPassValue("");
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
