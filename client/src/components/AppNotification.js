import React, { useState, useEffect, useContext } from "react";
import Alert from "@mui/material/Alert";
import { AppContext } from "../AppProvider";

const AppNotification = () => {
  const {
    appGlobalData: {
      notification: { type, message, show: showNotification = false } = {},
    } = {},
    setAppGlobalData,
  } = useContext(AppContext);
  const [show, setShow] = useState(showNotification);

  useEffect(() => {
    showNotification && setShow(showNotification);
    const timeId = setTimeout(() => {
      setShow(false);
      setAppGlobalData({ notification: {} });
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showNotification, setAppGlobalData]);

  if (!show) {
    return null;
  }

  return <Alert severity={type}>{message}</Alert>;
};
export default AppNotification;
