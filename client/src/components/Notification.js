import React, { useState, useEffect, useContext } from "react";
import Alert from "@mui/material/Alert";
import { AppContext } from "../AppProvider";

const Notification = () => {
  const { appGlobalData = {} } = useContext(AppContext);
  const { notification: { type, message, show: showNotification } = {} } =
    appGlobalData;
  console.log("AppProvider appGlobalData=", appGlobalData);
  const [show, setShow] = useState(showNotification);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showNotification]);

  if (!show) {
    return null;
  }

  return <Alert severity={type}>{message}</Alert>;
};
export default Notification;
