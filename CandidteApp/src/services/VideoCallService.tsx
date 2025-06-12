
// import * as signalR from '@microsoft/signalr';
// import { receiveInvitation, receiveOffer, receiveAnswer } from '../store/VideoCallSlice';
// import { store } from '../store/store';
// import { RefObject } from 'react';

// export class VideoCallService {
//   connection: signalR.HubConnection;
//   peerConnection: RTCPeerConnection | null = null;
//   localStream: MediaStream | null = null;
//   remoteCallerId: string | null = null;
//   private remoteVideoRef: RefObject<HTMLVideoElement> | null = null;
//   private localVideoRef: RefObject<HTMLVideoElement> | null = null;


//   setRemoteVideoRef(ref: RefObject<HTMLVideoElement>) {
//     this.remoteVideoRef = ref;
//   }

//   setLocalVideoRef(ref: RefObject<HTMLVideoElement>) {
//     this.localVideoRef = ref;
//   }
//   constructor() {
    
//     this.connection = new signalR.HubConnectionBuilder()
//       .withUrl(`${import.meta.env.VITE_API_URL}/videoCallHub`, { withCredentials: true })
//       .withAutomaticReconnect()
//       .build();

//     this.peerConnection = new RTCPeerConnection();

//     this.connection.on("ReceiveInterviewInvite", async (callerId: string) => {
//       store.dispatch(receiveInvitation(callerId));
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (this.remoteVideoRef!.current) {
//         this.remoteVideoRef!.current.srcObject = stream;
//       }
//     });

//     this.connection.on("ReceiveOffer", async (callerId: string, offer: string) => {
//       store.dispatch(receiveOffer({ callerId, offer }));
//       console.log("in recive offer");
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (this.remoteVideoRef!.current) {
//         this.remoteVideoRef!.current.srcObject = stream;
//       }
//     });

//     this.connection.on("ReceiveAnswer", async (answer: string) => {
//       await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)));
//       store.dispatch(receiveAnswer(answer));
//     });

//     this.connection.on("ReceiveIceCandidate", async (_from: string, candidateJson: string) => {
//       if (!this.peerConnection) return;
//       try {
//         const cand = JSON.parse(candidateJson);
//         await this.peerConnection.addIceCandidate(new RTCIceCandidate(cand));
//       } catch (e) {
//         console.error("שגיאה בהוספת ICE Candidate:", e);
//       }
//     });

//     this.connection.onclose(e => console.warn("SignalR connection closed:", e));
//   }

//   async connect() {
//     if (this.connection.state !== signalR.HubConnectionState.Disconnected) return;
//     await this.connection.start();
//     const userId = sessionStorage.getItem("userId") + '';
//     if (userId) {
//       await this.connection.invoke("RegisterUser", userId);
//     }
//     console.log("SignalR connected");
//   }


//   private createPeerConnection() {
//     this.peerConnection = new RTCPeerConnection({
//       iceServers: [
//         { urls: "stun:stun.l.google.com:19302" },
//         {
//           urls: 'turn:numb.viagenie.ca:3478',
//           username: 'guest',
//           credential: 'guest'
//         }
//       ]
//     });

//     this.peerConnection.onicecandidate = (event) => {
//       if (event.candidate && this.remoteCallerId) {
//         this.connection.invoke("SendIceCandidate", this.remoteCallerId, JSON.stringify(event.candidate));
//       }
//     };

//     this.peerConnection.ontrack = (event) => {
//       console.log("🎯 ontrack fired", event);
//       const [stream] = event.streams;
//       if (this.remoteVideoRef) {
//         if (this.remoteVideoRef.current) {
//           this.remoteVideoRef.current.srcObject = stream;
//         }
//       }
//     };
//   }

//   async initiateCall(targetUserId: string) {
//     this.peerConnection = new RTCPeerConnection();
//     this.remoteCallerId = targetUserId;
//     await this.connect();
//     this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

//     // Set local video stream
//     if (this.localVideoRef && this.localVideoRef.current) {
//       this.localVideoRef.current.srcObject = this.localStream;
//     }

//     // Add tracks to peer connection
//     this.localStream.getTracks().forEach((track) => {
//       this.peerConnection!.addTrack(track, this.localStream!);
//     });

//     // Create offer and send to remote peer
//     const offer = await this.peerConnection.createOffer();
//     await this.peerConnection.setLocalDescription(offer);

//     this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     this.createPeerConnection();

//     this.localStream.getTracks().forEach(track => {
//       this.peerConnection!.addTrack(track, this.localStream!);
//     });

//     try {
//       await this.connection.invoke("SendOffer", targetUserId, JSON.stringify(offer));
//     } catch (e) {
//       console.log("failed in send offer", e);
//     }
//   }

//   async answerCall(callerId: string, offer: string) {
//     this.remoteCallerId = callerId;
//     await this.connect();

//     this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     this.createPeerConnection();

//     this.localStream.getTracks().forEach(track => {
//       this.peerConnection!.addTrack(track, this.localStream!);
//     });

//     await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(JSON.parse(offer)));
//     const answer = await this.peerConnection!.createAnswer();
//     await this.peerConnection!.setLocalDescription(answer);

//     await this.connection.invoke("SendAnswer", callerId, JSON.stringify(answer));
//   }

//   setRemoteTrackHandler(remoteVideoRef: RefObject<HTMLVideoElement | null>) {
//     this.peerConnection!.ontrack = (event) => {
//       console.log("🎯 ontrack fired", event);
//       const [stream] = event.streams;
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = stream;
//       }
//     };
//   }
// }
import * as signalR from '@microsoft/signalr';
import { receiveInvitation, receiveOffer, receiveAnswer } from '../store/VideoCallSlice';
import { store } from '../store/store';
import { RefObject } from 'react';

export class VideoCallService {
  connection: signalR.HubConnection;
  peerConnection: RTCPeerConnection | null = null;
  localStream: MediaStream | null = null;
  remoteCallerId: string | null = null;
  private remoteVideoRef: RefObject<HTMLVideoElement> | null = null;
  private localVideoRef: RefObject<HTMLVideoElement> | null = null;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/videoCallHub`, { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    this.connection.on("ReceiveInterviewInvite", async (callerId: string) => {
      store.dispatch(receiveInvitation(callerId));
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (this.remoteVideoRef?.current) {
        this.remoteVideoRef.current.srcObject = stream;
      }
    });

    this.connection.on("ReceiveOffer", async (callerId: string, offer: string) => {
      store.dispatch(receiveOffer({ callerId, offer }));
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (this.remoteVideoRef?.current) {
        this.remoteVideoRef.current.srcObject = stream;
      }
    });

    this.connection.on("ReceiveAnswer", async (answer: string) => {
      if (!this.peerConnection) {
        this.createPeerConnection();
      }
      await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)));
      store.dispatch(receiveAnswer(answer));
    });

    this.connection.on("ReceiveIceCandidate", async (_from: string, candidateJson: string) => {
      if (!this.peerConnection) return;
      try {
        const candidate = JSON.parse(candidateJson);
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error("שגיאה בהוספת ICE Candidate:", e);
      }
    });

    this.connection.onclose(e => console.warn("SignalR connection closed:", e));
  }

  setRemoteVideoRef(ref: RefObject<HTMLVideoElement>) {
    this.remoteVideoRef = ref;
  }

  setLocalVideoRef(ref: RefObject<HTMLVideoElement>) {
    this.localVideoRef = ref;
  }

  async connect() {
    if (this.connection.state !== signalR.HubConnectionState.Disconnected) return;
    await this.connection.start();
    const userId = sessionStorage.getItem("userId") + '';
    if (userId) {
      await this.connection.invoke("RegisterUser", userId);
    }
    console.log("SignalR connected");
  }

  private createPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: 'turn:numb.viagenie.ca:3478',
          username: 'guest',
          credential: 'guest'
        }
      ]
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.remoteCallerId) {
        this.connection.invoke("SendIceCandidate", this.remoteCallerId, JSON.stringify(event.candidate));
      }
    };

    this.peerConnection.ontrack = (event) => {
      const [stream] = event.streams;
      if (this.remoteVideoRef?.current) {
        this.remoteVideoRef.current.srcObject = stream;
      }
    };
  }

  async initiateCall(targetUserId: string) {
    this.remoteCallerId = targetUserId;
    await this.connect();

    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    if (this.localVideoRef?.current) {
      this.localVideoRef.current.srcObject = this.localStream;
    }

    this.createPeerConnection();

    this.localStream.getTracks().forEach(track => {
      this.peerConnection!.addTrack(track, this.localStream!);
    });

    const offer = await this.peerConnection!.createOffer();
    await this.peerConnection!.setLocalDescription(offer);

    try {
      await this.connection.invoke("SendOffer", targetUserId, JSON.stringify(offer));
    } catch (e) {
      console.error("failed in send offer", e);
    }
  }

  async answerCall(callerId: string, offer: string) {
    this.remoteCallerId = callerId;
    await this.connect();

    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.createPeerConnection();

    this.localStream.getTracks().forEach(track => {
      this.peerConnection!.addTrack(track, this.localStream!);
    });

    await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(JSON.parse(offer)));
    const answer = await this.peerConnection!.createAnswer();
    await this.peerConnection!.setLocalDescription(answer);

    await this.connection.invoke("SendAnswer", callerId, JSON.stringify(answer));
  }

  setRemoteTrackHandler(remoteVideoRef: RefObject<HTMLVideoElement | null>) {
    this.peerConnection!.ontrack = (event) => {
      const [stream] = event.streams;
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };
  }
}
