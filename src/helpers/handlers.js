export const Handlers = {
  defaultErrorHandler: (errorText) => {
    console.log("errorText", errorText);
  },
  defaultErrorAPIHandler: (errorText, status) => {
    console.log("errorText", errorText);
    console.log("status", status);
  }
};
