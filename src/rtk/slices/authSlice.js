import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ user, setLoading, params }, thunkAPI) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `https://${params}.almnew.online/api/login`,
        user,
        config
      );
      console.log(res);
      setLoading(false);
      return res.data;
    } catch (error) {
      // return custom error message from backend if present
      console.log(error);
      setLoading(false);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    msg: false,
    domin: true,
    signIn: false,
    refrech: 0,
    user: JSON.parse(sessionStorage.getItem("userCorner"))
      ? JSON.parse(sessionStorage.getItem("userCorner"))
      : "",
    token: sessionStorage.getItem("token")
      ? sessionStorage.getItem("token")
      : "",
    loading: false,
    error: false,
    CurrentStudy: JSON.parse(sessionStorage.getItem("CurrentStudy"))
      ? JSON.parse(sessionStorage.getItem("CurrentStudy"))
      : "",
    // currentUser: null,
  },
  reducers: {
    loginStart: (state, actios) => {
      state.loading = true;
      console.log(actios);
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;

      sessionStorage.setItem("userCorner", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    dominStatus: (state, action) => {
      state.domin = action.payload;
      console.log(action.payload);
    },

    CurrentStudy: (state, action) => {
      state.CurrentStudy = action.payload;
    },
    deleteSign: (state, action) => {
      state.signIn = false;
    },
    refrechPosts: (state, action) => {
      state.refrech += 1;
    },
    handleLogout: (state, action) => {
      state.user = "";
      sessionStorage.removeItem("userCorner")
    },
  },
  extraReducers: {
    // register user

    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
      if (payload) {
        state.msg = false;
        sessionStorage.setItem("userCorner", JSON.stringify(payload));
        // state.token = payload.data.token;
        // sessionStorage.setItem("token", payload.data.token);

        state.user = payload;
      } else {
        state.msg = true;
      }

      state.success = true; // registration successful
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  dominStatus,
  loginGoogle,
  deleteSign,
  CurrentStudy,
  refrechPosts,
  handleLogout,
} = authSlice.actions;
export default authSlice.reducer;
