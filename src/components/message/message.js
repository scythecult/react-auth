import React, { useEffect, useState } from "react";
import classes from "./message.module.css";

const Message = ({ messageText, wasSended }) => {
  // const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   switch (messageText) {
  //     case "MISSING_PASSWORD":
  //       setMessage("Password was missed, please return and type it");
  //       break;
  //     case "EMAIL_NOT_FOUND":
  //       setMessage("Email was not found in our db");
  //       break;

  //     default:
  //       return;
  //   }
  // }, [messageText]);

  useEffect(() => {
    if (messageText) {
      setIsVisible(true);
    }

    const timerId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timerId);
  }, [wasSended, messageText]);

  const messageClasses = isVisible
    ? classes.message
    : `${classes.message} ${classes.hidden}`;

  return <p className={messageClasses}>{messageText}</p>;
};

export { Message };
