import api from "../../app/api";

const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: {
    signingUp: false,
    logginIn: false,
    signupError: null,
    loginError: false,
    loggedIn: false,
    username: null,
  },
  reducers: {
    //Sign up
    signupUserStart(state, action) {
      state.signingUp = true;
    },
    signupUserSuccess(state, action) {
      state.signingUp = false;
      state.loggedIn = true;
      state.signupError = null;
    },
    signupUserError(state, action) {
      state.signingUp = false;
      state.loggedIn = false;
      state.signupError = action.payload;
    },
    //Log in
    loginUserStart(state, action) {
      state.logginIn = true;
    },
    loginUserSuccess(state, action) {
      state.logginIn = false;
      state.loggedIn = true;
      state.loginError = null;
      state.username = action.payload;
    },
    loginUserError(state, action) {
      state.logginIn = false;
      state.loggedIn = false;
      state.loginError = action.payload;
    },
    logoutUserStart(state, action) {
      state.logginIn = false;
      state.loggedIn = false;
      state.username = null;
    },
  },
});

export const {
  signupUserStart,
  signupUserSuccess,
  signupUserError,
  loginUserStart,
  loginUserSuccess,
  loginUserError,
  logoutUserStart,
} = userSlice.actions;

//Usuario: diegomont
//Clave: 12345

export const signupUser = (user, history) => {
  return async function (dispatch) {
    dispatch(signupUserStart());
    try {
      const response = await api.post("/users", user);
      dispatch(signupUserSuccess(response.data.user.username));

      // guarda token en localstorage
      localStorage.setItem("token", response.data.token);
      // actualiza instancia de axios
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      //redirecciona a tweets
      // history est'a disponible en los componentes llamados por route
      history.push("/");
    } catch (error) {
      dispatch(signupUserError(error.response?.data));
    }
  };
};

export const loginUser = (data, history) => {
  return async function (dispatch) {
    dispatch(loginUserStart());

    try {
      const response = await api.post("/sessions", data);
      dispatch(loginUserSuccess(response.data.user.username));

      // guarda token en localstorage
      localStorage.setItem("token", response.data.token);
      // actualiza instancia de axios
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      //redirecciona a tweets
      // history est'a disponible en los componentes llamados por route
      history.push("/");
    } catch (error) {
      dispatch(loginUserError(error.response?.data));
    }
  };
};

export const logoutUser = (history) => {
  return function (dispatch) {
    dispatch(logoutUserStart());
    localStorage.removeItem("token");
    history.push("/login");
  };
};

export default userSlice.reducer;
