
import * as signalR from '@microsoft/signalr';
import { receiveInvitation, receiveOffer, receiveAnswer } from '../store/VideoCallSlice';
import { store } from '../store/store';
import { RefObject } from 'react';

export class VideoCallService {
  connection: signalR.HubConnection;
  peerConnection: RTCPeerConnection | null = null;
  localStream: MediaStream | null = null;
  remoteCallerId: string | null = null;
  remoteVideoRef: any;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/videoCallHub`, { withCredentials: true })
      .withAutomaticReconnect()
      .build();
    this.peerConnection = new RTCPeerConnection();
    this.connection.on("ReceiveInterviewInvite", (callerId: string) => {
      store.dispatch(receiveInvitation(callerId));
      const stream =  navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (this.remoteVideoRef.current) {
        this.remoteVideoRef.current.srcObject = stream;
      }
    });

     

      this.connection.on("ReceiveOffer", async (callerId: string, offer: string) => {
        store.dispatch(receiveOffer({ callerId, offer }));
        const stream =  navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (this.remoteVideoRef.current) {
        this.remoteVideoRef.current.srcObject = stream;
      }
      });

      this.connection.on("ReceiveAnswer", async (answer: string) => {
        await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)));
        store.dispatch(receiveAnswer(answer));
      });

      this.connection.on("ReceiveIceCandidate", async (_from: string, candidateJson: string) => {
        if (!this.peerConnection) return;
        try {
          const cand = JSON.parse(candidateJson);
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(cand));
        } catch (e) {
          console.error("שגיאה בהוספת ICE Candidate:", e);
        }
      });

      this.connection.onclose(e => console.warn("SignalR connection closed:", e));
    }


  async connect() {
      if(this.connection.state !== signalR.HubConnectionState.Disconnected) return;
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
        { urls: "stun:stun1.l.google.com:19302" },
      ]
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.remoteCallerId) {
        this.connection.invoke("SendIceCandidate", this.remoteCallerId, JSON.stringify(event.candidate));
      }
    }; this.peerConnection.ontrack = (event) => {
      console.log("🎯 ontrack fired", event);

      const [stream] = event.streams;
      console.log(this.remoteVideoRef);
      
      if (this.remoteVideoRef) { // ודא שיש לך הפניה ל-Ref
        this.remoteVideoRef.srcObject = stream;
      }
    };


  }

  async initiateCall(targetUserId: string) {
    this.peerConnection = new RTCPeerConnection();
    this.remoteCallerId = targetUserId;
    await this.connect();

    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.createPeerConnection();

    this.localStream.getTracks().forEach(track => {
      this.peerConnection!.addTrack(track, this.localStream!);
    });

    const offer = await this.peerConnection!.createOffer();
    await this.peerConnection!.setLocalDescription(offer);

    try {
      await this.connection.invoke("SendOffer", targetUserId, JSON.stringify(offer));
    } catch (e) {
      console.log("failed in send offer", e);
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
      console.log("🎯 ontrack fired", event);

      const [stream] = event.streams;
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };
  }
}
// import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

// export class VideoCallService {
//   public connection!: HubConnection;
//   public peerConnection!: RTCPeerConnection;
//   public localStream!: MediaStream;
//   public remoteCallerId: string | null = null;
//   public remoteVideoRef: React.RefObject<HTMLVideoElement> | null = null;

//   constructor(private hubUrl: string) {}

//   async init(userId: string) {
//     this.connection = new HubConnectionBuilder()
//       .withUrl(this.hubUrl)
//       .build();

//     this.connection.on("ReceiveOffer", async (callerId: string, offer: string) => {
//       console.log("📞 קיבלנו Offer מ:", callerId);
//       this.remoteCallerId = callerId;
//       await this.handleOffer(offer);
//     });

//     this.connection.on("ReceiveAnswer", async (answer: string) => {
//       console.log("📞 קיבלנו Answer");
//       const remoteDesc = new RTCSessionDescription(JSON.parse(answer));
//       await this.peerConnection.setRemoteDescription(remoteDesc);
//     });

//     this.connection.on("ReceiveIceCandidate", async (candidate: string) => {
//       console.log("🌍 קיבלנו ICE Candidate");
//       try {
//         await this.peerConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
//       } catch (err) {
//         console.error("שגיאה ב-addIceCandidate:", err);
//       }
//     });

//     this.connection.on("ReceiveEndCall", () => {
//       console.log("🔚 השיחה הסתיימה");
//       this.endCall();
//     });

//     await this.connection.start();
//     console.log("✅ חיבור SignalR התחיל");
//     await this.connection.invoke("Register", userId);
//   }

//   private createPeerConnection() {
//     console.log("🎬 יצירת peerConnection");
//     this.peerConnection = new RTCPeerConnection({
//       iceServers: [
//         { urls: "stun:stun.l.google.com:19302" },
//         { urls: "stun:stun1.l.google.com:19302" },
//       ]
//     });

//     this.peerConnection.onicecandidate = (event) => {
//       if (event.candidate && this.remoteCallerId) {
//         console.log("➡️ שליחת ICE Candidate ל", this.remoteCallerId);
//         this.connection.invoke("SendIceCandidate", this.remoteCallerId, JSON.stringify(event.candidate));
//       }
//     };

//     this.peerConnection.ontrack = (event) => {
//       console.log("🎯 ontrack – הגיע סטרים מרוחק");
//       const [stream] = event.streams;
//       if (this.remoteVideoRef?.current) {
//         console.log("🎥 הצגת וידאו מרוחק");
//         this.remoteVideoRef.current.srcObject = stream;
//       } else {
//         console.warn("⚠️ remoteVideoRef לא מוגדר בעת קבלת וידאו");
//       }
//     };
//   }

//   async startCall(targetUserId: string, localStream: MediaStream) {
//     console.log("📞 ייזום שיחה ל:", targetUserId);
//     this.remoteCallerId = targetUserId;
//     this.localStream = localStream;
//     this.createPeerConnection();

//     this.localStream.getTracks().forEach(track => {
//       console.log("➕ הוספת טרק מקומי ל-peer", track.kind);
//       this.peerConnection.addTrack(track, this.localStream);
//     });

//     const offer = await this.peerConnection.createOffer();
//     await this.peerConnection.setLocalDescription(offer);
//     console.log("📤 שולח Offer:", offer);
//     await this.connection.invoke("SendOffer", targetUserId, JSON.stringify(offer));
//   }

//    async handleOffer(offer: string) {
//     console.log("📥 טיפול ב-Offer");
//     this.createPeerConnection();
//     this.localStream.getTracks().forEach(track => {
//       console.log("➕ הוספת טרק מקומי בעת מענה", track.kind);
//       this.peerConnection.addTrack(track, this.localStream);
//     });

//     const remoteDesc = new RTCSessionDescription(JSON.parse(offer));
//     await this.peerConnection.setRemoteDescription(remoteDesc);
//     console.log("📥 Offer הוגדר כ-RemoteDescription");

//     const answer = await this.peerConnection.createAnswer();
//     await this.peerConnection.setLocalDescription(answer);
//     console.log("📤 שליחת Answer:", answer);
//     await this.connection.invoke("SendAnswer", this.remoteCallerId, JSON.stringify(answer));
//   }

//   async setLocalStream(stream: MediaStream) {
//     console.log("🎥 הגדרת סטרים מקומי");
//     this.localStream = stream;
//   }

//   endCall() {
//     console.log("🔚 ניתוק השיחה");
//     this.peerConnection?.close();
//     this.peerConnection = undefined!;
//     this.remoteCallerId = null;
//     if (this.remoteVideoRef?.current) {
//       this.remoteVideoRef.current.srcObject = null;
//     }
//   }

//   async sendEndCall() {
//     if (this.remoteCallerId) {
//       console.log("🛑 שליחת בקשת סיום שיחה ל", this.remoteCallerId);
//       await this.connection.invoke("SendEndCall", this.remoteCallerId);
//       this.endCall();
//     }
//   }
// }
