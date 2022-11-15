import { useState } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (isLogin) {
      console.log("login existing user by comparing email/pass");
    } else {
      console.log("creates new user");
    }

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=", {
      method: "POST",
      body: JSON.stringify({
        email: emailValue,
        password: passValue,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response?.error) {
          const { message } = response.error;

          setMessage(message);
        }
      });
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
          {<p style={{ color: "white", marginTop: "4px" }}>{message}</p>}
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
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
