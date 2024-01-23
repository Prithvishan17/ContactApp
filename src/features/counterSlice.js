/**************************  BARD REDUX SLICE  **************************/
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const initialState = { user: null };

// const persistConfig = {
//   key: 'user',
//   storage: AsyncStorage,
// };

// export const fetchUser = createAsyncThunk(
//   'user/fetch',
//   // Your logic to fetch user data from a source
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser(state, action) {
//       state.user = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//       })
//       .addCase(fetchUser.rejected, (state) => {
//         state.user = null;
//       });
//   },
// });

// export const { setUser } = userSlice.actions;

// export default persistReducer(persistConfig, userSlice.reducer);



/**************************  CHATGPT REDUX SLICE  **************************/

// src/features/counterSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const counterSlice = createSlice(
//   {
//     name: 'counter',
//     initialState: { value: 0, screenTime: {} },
//     reducers: {
//       increment: state => { state.value += 1; },
//       decrement: state => { state.value -= 1; },
//       startScreenTimer: (state, action) => {
//         const { screenName, startTime } = action.payload;
//         state.screenTime[screenName] = { startTime };
//       },
//       stopScreenTimer: (state, action) => {
//         const { screenName, stopTime } = action.payload;
//         const startTime = state.screenTime[screenName]?.startTime || 0;

//         state.screenTime[screenName] = {
//           startTime,
//           stopTime,
//           elapsedTime: stopTime - startTime,
//         };

//       },
//     },
//   });

// export const { increment, decrement, startScreenTimer, stopScreenTimer } = counterSlice.actions;
// export default counterSlice.reducer;
