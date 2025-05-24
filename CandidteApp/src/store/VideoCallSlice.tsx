// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface VideoCallState {
//   isInCall: boolean;
//   remoteOffer: string | null;
//   remoteAnswer: string | null;
//   callerId: string | null;
// }

// const initialState: VideoCallState = {
//   isInCall: false,
//   remoteOffer: null,
//   remoteAnswer: null,
//   callerId: null,
// };

// const videoCallSlice = createSlice({
//   name: 'videoCall',
//   initialState,
//   reducers: {
//     startCall(state) {
      
//       state.isInCall = true;
//     },
//     endCall(state) {
//       state.isInCall = false;
//       state.remoteOffer = null;
//       state.remoteAnswer = null;
//       state.callerId = null;
//     },
//     receiveOffer(state, action: PayloadAction<{ callerId: string; offer: string }>) {
//       console.log("in dispatch receiveOffer", action.payload.callerId, action.payload.offer);
//       state.isInCall = true;
//       state.remoteOffer = action.payload.offer;
//       state.callerId = action.payload.callerId;
//     },
//     receiveAnswer(state, action: PayloadAction<string>) {
//       console.log("in dispatch receiveAnswer");
//       state.remoteAnswer = action.payload;
//     },

//     receiveInvitation(state, action: PayloadAction<string>) {
//       console.log("in dispatch receiveInvitation", action.payload);
//         state.callerId = action.payload;
//         state.isInCall = true;
//       }
//   },
// });

// export const { startCall, endCall, receiveOffer, receiveAnswer,receiveInvitation} = videoCallSlice.actions;
// export default videoCallSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoCallState {
  isInCall: boolean;
  remoteOffer: string | null;
  remoteAnswer: string | null;
  callerId: string | null;
}

const initialState: VideoCallState = {
  isInCall: false,
  remoteOffer: null,
  remoteAnswer: null,
  callerId: null,
};

const videoCallSlice = createSlice({
  name: 'videoCall',
  initialState,
  reducers: {
    startCall(state) {
      state.isInCall = true;
    },
    endCall(state) {
      state.isInCall = false;
      state.remoteOffer = null;
      state.remoteAnswer = null;
      state.callerId = null;
    },
    receiveOffer(state, action: PayloadAction<{ callerId: string; offer: string }>) {
      console.log("in dispatch receiveOffer", action.payload.callerId, action.payload.offer);
      state.isInCall = true;
      state.remoteOffer = action.payload.offer;
      state.callerId = action.payload.callerId;
    },
    receiveAnswer(state, action: PayloadAction<string>) {
      console.log("in dispatch receiveAnswer");
      state.remoteAnswer = action.payload;
    },
    receiveInvitation(state, action: PayloadAction<string>) {
      console.log("in dispatch receiveInvitation", action.payload);
      state.callerId = action.payload;
      state.isInCall = true;
    }
  },
});

export const { startCall, endCall, receiveOffer, receiveAnswer, receiveInvitation } = videoCallSlice.actions;
export default videoCallSlice.reducer;
