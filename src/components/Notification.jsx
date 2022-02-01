import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import AppContext from "../contexts/AppContext";
import Message from "./Message";


const NotificationContainer = styled(ToastContainer)`
  padding: 0;

  min-width: 600px;

  .Toastify__toast {
    padding: 0;

    background-color: transparent;
    box-shadow: none;

    &:last-child {
      margin: 0;
    }
  }

  .Toastify__toast-body {
    margin: 0;
    padding: 0;
  }
`;


const Notification = () => {
  const { state } = useContext(AppContext);
  const { toastValue } = state;

  const showToast = (text, type) => toastValue?.isShow && toast(
    <Message text={text} type={type} />
  );

  useEffect(() => showToast(toastValue?.text, toastValue?.type), [toastValue]);

  return (
    <NotificationContainer
      position="bottom-center"
      autoClose={4000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable={false}
      closeButton={false}
      pauseOnHover={false}
    />
  );
};

export default Notification;
