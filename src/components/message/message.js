import React, { useEffect, useState } from "react";
import classes from "./message.module.css";

const Message = ({ MESSAGE_CODE, wasSended }) => {
  // const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   switch (MESSAGE_CODE) {
  //     case "MISSING_PASSWORD":
  //       setMessage("Password was missed, please return and type it");
  //       break;
  //     case "EMAIL_NOT_FOUND":
  //       setMessage("Email was not found in our db");
  //       break;

  //     default:
  //       return;
  //   }
  // }, [MESSAGE_CODE]);

  useEffect(() => {
    if (MESSAGE_CODE) {
      setIsVisible(true);
    }

    const timerId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timerId);
  }, [wasSended, MESSAGE_CODE]);

  const messageClasses = isVisible
    ? classes.message
    : `${classes.message} ${classes.hidden}`;

  return <p className={messageClasses}>{MESSAGE_CODE}</p>;
};

export { Message };
