// authActions.js
// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// const backendURL = "https://wearher-from-mimi.com";

// export const registerUser = createAsyncThunk(
//   "api/register",
  // async (user, { rejectWithValue }) => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     console.log("first")
  //     const request = await axios.post(
  //       `https://wearher-from-mimi.com/api/register`,
  //       user,
  //       config
  //     );
  //     const response = await request.data;
  //     return response;
  //   } catch (error) {
  //     // return custom error message from backend if present
  //     if (error.response && error.response.data.message) {
  //       return rejectWithValue(error.response.data.message);
  //     } else {
  //       return rejectWithValue(error.message);
  //     }
  //   }
  // }
// );
