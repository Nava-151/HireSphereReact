
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VideoCallService } from '../../services/VideoCallService';
import { receiveAnswer, receiveOffer, startCall } from '../../store/VideoCallSlice';
import { RootState } from '../../store/store';
import { Box, Button, Grid, Paper, Typography } from '../../MuiImports';

const videoCallService = new VideoCallService();

const VideoCall = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();

  const callerId = useSelector((state: RootState) => state.videoCall.callerId);
  const isInCall = useSelector((state: RootState) => state.videoCall.isInCall);

  useEffect(() => {
    console.log("is in call update", isInCall);
    if (videoCallService.localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = videoCallService.localStream;
    }
    if (remoteVideoRef.current) {
        videoCallService.setRemoteVideoRef(remoteVideoRef as React.RefObject<HTMLVideoElement>);
    }

  }, [isInCall]);

  const startConnection = async () => {
    await videoCallService.connect().then(() => console.log("connected"));
    videoCallService.connection.on("ReceiveOffer", async (callerId, offer) => {
      console.log("in receive offer");
      dispatch(receiveOffer({ callerId, offer }));
      await videoCallService.answerCall(callerId, offer);
      dispatch(startCall());
    });
    videoCallService.connection.on("ReceiveAnswer", (answer) => {
      dispatch(receiveAnswer(answer));
    });
    videoCallService.setRemoteTrackHandler(remoteVideoRef);
  };

  useEffect(() => {
    startConnection();
  }, []);

  const joinCall = async () => {
    if (!callerId) return;
    if (!videoCallService.localStream) {
      videoCallService.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoCallService.localStream.getTracks().forEach(track =>
        videoCallService.peerConnection!.addTrack(track, videoCallService.localStream!)
      );
    }
    if (localVideoRef.current && videoCallService.localStream) {
      localVideoRef.current.srcObject = videoCallService.localStream;
    }
    videoCallService.setRemoteTrackHandler(remoteVideoRef);
    dispatch(startCall());
  };

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
        <Typography variant="h5" gutterBottom>
          Video Call
        </Typography>
        {!isInCall && (
          <Box>wait until your employer invites you</Box>
        )}
        <Button variant="outlined" color="success" onClick={joinCall} sx={{ mb: 2, ml: 2 }}>
          📞 join 
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" align="center">local</Typography>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" align="center">your potential boss</Typography>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default VideoCall;
