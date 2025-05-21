import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VideoCallService } from '../../services/VideoCallService';
import { receiveAnswer, receiveOffer, startCall } from '../../store/VideoCallSlice';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';
import { RootState } from '../../store/store';

const videoCallService = new VideoCallService();

export const VideoCallComponent = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const dispatch = useDispatch();

    const callerId = useSelector((state: RootState) => state.videoCall.callerId);
    const isInCall = useSelector((state: RootState) => state.videoCall.isInCall);

    useEffect(() => {
        console.log("is in call updtate", isInCall);
        console.log(localVideoRef.current);
        
        if (videoCallService.localStream && localVideoRef.current) {
            console.log("inside if who needs to open the camera");
            localVideoRef.current!.srcObject = videoCallService.localStream;
        }
    }, [isInCall]);
  const startConnection = async () => {
            await videoCallService.connect();
console.log("after connect");

            videoCallService.connection.on("ReceiveOffer", async (callerId, offer) => {
                console.log("in recive offer");
                
                dispatch(receiveOffer({ callerId, offer }));
                await videoCallService.answerCall(callerId, offer);
                dispatch(startCall());
            });

            videoCallService.connection.on("ReceiveAnswer", (answer) => {
                console.log("in recive answer ");
                
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
                {!isInCall && callerId && (
                    <Button variant="outlined" color="success" onClick={joinCall} sx={{ mb: 2, ml: 2 }}>
                        📞 join
                    </Button>
                )}

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
                        <Typography variant="subtitle1" align="center">your potential boss </Typography>
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
