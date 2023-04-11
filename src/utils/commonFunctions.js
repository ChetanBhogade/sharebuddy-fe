export const getErrorMessage = (errorObj) => {
  if (errorObj?.response?.status === 401) {
    localStorage.clear();
    return errorObj?.response?.statusText || "Unauthorized";
  }
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

export const sortListOfObjects = (list, property, isAscending = true) =>
  list.sort((a, b) => {
    if (typeof a[property] === "number") {
      return isAscending
        ? a[property] - b[property]
        : b[property] - a[property];
    } else {
      return isAscending
        ? a[property] < b[property]
          ? -1
          : a[property] > b[property]
          ? 1
          : 0
        : a[property] > b[property]
        ? -1
        : a[property] < b[property]
        ? 1
        : 0;
    }
  });
