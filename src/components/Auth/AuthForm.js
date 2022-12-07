import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SIGN_IN_URL, SIGN_UP_URL, STORAGE_KEY } from "../../consts/consts";
import { logIn } from "../../features/user-auth-slice";
import { useHttp } from "../../hooks/hooks";
import { Message } from "../message/message";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fetchData, { isLoading }] = useHttp();
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const userData = { email: emailValue, password: passValue, returnSecureToken: true };
    const requestUrl = isLogin ? SIGN_IN_URL : SIGN_UP_URL;

    fetchData({ url: requestUrl, method: "POST", items: userData }).then((response) => {
      if (response?.errors?.length) {
        setMessage(response?.message);
      } else {
        dispatch(logIn({ token: response.idToken, login: emailValue }));
        navigate("/");
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ token: response.idToken, login: emailValue })
        );
      }
    });

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
          <Message messageText={message} wasSended={isLoading} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Login" : "Create Account"}</button>}
          {isLoading && <p>Sending request...</p>}
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
