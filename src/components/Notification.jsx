import { ToastContainer } from "react-toastify";
import styled from "styled-components";

const StyledNotificationContainer = styled(ToastContainer)`
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
  return (
    <StyledNotificationContainer
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
