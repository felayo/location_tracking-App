import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    // signup and signin case can be condensed to signin case only since both are identical,
    // remove the signup case and change type: 'signup' to type 'signin' in signup function below
    case "signout":
      return { ...state };
    case "clear_error_message":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

// Automatice Signin: creating a function to check Async Storage for token when app is launch
const tryLocalSignin = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({
        type: "signin",
        payload: token,
      });

      navigate("mainFlow"); //navigate to main flow screens once token is found
    } else {
      navigate("loginFlow"); // navigate fo loginFlow if no token is found
    }
  };
};

// To clear error message when user navigate between signup and signin screens
const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message" });
  };
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    // make api request by siginnup with the email and password from the arguments
    try {
      const response = await trackerApi.post("/signup", { email, password });

      // take JWT we get from API and store it on the device with Async Storage
      await AsyncStorage.setItem("token", response.data.token);

      dispatch({ type: "signup", payload: response.data.token });

      //After dispatch action, i want to navigate to mainFlows screens
      // since i'm outside react navigation screen, a function was written a called from navigationRef.js
      // now navigate with the below line

      navigate("mainFlow");

      // taking the token out of Storage:
      //await AsyncStorage.getItem("token");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "something went wrong with sign up",
      });
    }

    // if we signup, modify our state, and say that we are authenticated

    // if signing up fails, we probably need to reflect an error message somewhere
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    // Try to signin
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });

      navigate("mainFlow");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "something went wrong with sign in",
      });
    }
    // Handle success by updating state
    // Handle failure by showing error message
  };
};

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("loginFlow");
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
