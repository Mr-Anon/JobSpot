import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

//Register Applicant
// export const registerApp = (userData, history) => dispatch => {
//   console.log("aloo")
//   console.log(userData)
//   axios
//     .post("/api/applicant/register", userData)
//     .then(res => history.push("/login")) // re-direct to login on successful register
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

export const registerApp= (userData, history) => dispatch => {
  axios
    .post("/api/applicant/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Register Recruiter
export const registerRec = (userData, history) => dispatch => {
  axios
    .post("/api/recruiter/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Register Recruiter
export const addJob = (userData, history) => dispatch => {
  axios
    .post("/api/recruiter/addJob", userData)
    .then(res => history.push("/dashboard")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const upRecPro = (userData, history) => dispatch => {
  axios
    .post("/api/recruiter/updateprofile", userData)
    .then(res => history.push("/recprofile")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const upAppPro = (userData, history) => dispatch => {
  axios
    .post("/api/applicant/updateprofile", userData)
    .then(res => history.push("/appprofile")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Login - get user token
export const loginUser = userData => dispatch => {
  
  axios
    .post("/api/login", userData)
    .then(res => {
      // Save to localStorage// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      // console.log("hi");
      // console.log(decoded);
      // console.log("hi");
      localStorage.setItem("USER", JSON.stringify(decoded));
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      );
      
  };// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};// Log user out
export const logoutUser = () => dispatch => {
  // window.location.reload()
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("USER");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};