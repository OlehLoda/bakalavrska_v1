"use client";
import s from "./alert.module.css";
import { useEffect } from "react";
import { useGlobalContext } from "@/components/context/context";
import { IAlertInfo } from "@/components/context/types";
import WarningIcon from "./icons/warning";
import ErrorIcon from "./icons/error";
import InformationalIcon from "./icons/informational";
import SuccessfulIcon from "./icons/successful";

const info: IAlertInfo = {
  warning: {
    background: "#FCF6E6",
    color: "#FAE8B8",
    text: "Warning",
    img: <WarningIcon />,
  },
  cancel: {
    background: "#FBEEEE",
    color: "#F1CACA",
    text: "Cancel",
    img: <ErrorIcon />,
  },
  info: {
    background: "#DAF1FB",
    color: "#ACD7E9",
    text: "Info",
    img: <InformationalIcon />,
  },
  success: {
    background: "#DCF9DF",
    color: "#B3E097",
    text: "Success",
    img: <SuccessfulIcon />,
  },
};

export default function Alert() {
  const {
    state: { alert },
    setAlert,
  } = useGlobalContext();

  const closeAlert = () => {
    setAlert(null);
  };

  useEffect(() => {
    if (!alert) return;

    let timeout: NodeJS.Timeout;

    timeout = setTimeout(() => {
      closeAlert();
    }, 3000);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [alert]);

  if (!alert) return <></>;

  return (
    <div className={s.alert}>
      <p>{"text || alertInfo.text"}</p>
      <i className={s.cross} />
    </div>
  );
}
