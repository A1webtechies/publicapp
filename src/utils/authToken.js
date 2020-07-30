import API from "../api";

export const setAuthTokenToEachRequest = (token) => {
  if (token) {
    console.log(token);
    API.defaults.headers.common = { Authorization: `Bearer ${token}` };
  } else {
    delete API.defaults.headers.common.Authorization;
  }
};
