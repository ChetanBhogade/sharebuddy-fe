export const getErrorMessage = (errorObj) => {
  if (errorObj?.response?.data?.message?.length > 1) {
    return errorObj?.response?.data?.message;
  }
  if (errorObj?.message.length > 1) {
    return errorObj?.message;
  }
  if (errorObj?.response.length > 1) {
    return errorObj?.response;
  }
  return "Something Went Wrong!!!";
};
