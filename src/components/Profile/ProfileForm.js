import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CHANGE_PASS_URL } from "../../consts/consts";
import { logIn } from "../../features/user-auth-slice";
import { useHttp } from "../../hooks/hooks";
import { Message } from "../message/message";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.userAuth);
  const [fetchData, { isLoading }] = useHttp();
  const [passValue, setPassValue] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (evt) => {
    evt.preventDefault();

    const userData = {
      idToken: userToken,
      password: passValue,
      returnSecureToken: true,
    };

    fetchData({ url: CHANGE_PASS_URL, method: "POST", items: userData }).then(
      (response) => {
        if (response?.errors?.length) {
          setMessage(response?.message);
        } else {
          dispatch(logIn(response.idToken));
          navigate("/");
        }
      }
    );

    setMessage("");
    setPassValue("");
  };

  const onPassChange = (evt) => {
    setPassValue(evt.target.value.trim());
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          onChange={onPassChange}
          value={passValue}
          type="password"
          id="new-password"
        />
        <Message MESSAGE_CODE={message} wasSended={isLoading} />
      </div>
      <div className={classes.action}>
        {!isLoading && <button>Change Password</button>}
        {isLoading && <p>Sending request...</p>}
      </div>
    </form>
  );
};

export default ProfileForm;
