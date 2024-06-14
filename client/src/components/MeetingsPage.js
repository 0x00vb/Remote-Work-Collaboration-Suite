import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MeetingService from './meeting/MeetingService';
import { muteOrUnmuteAudio, playOrStopVideo, sendMessage, shareScreen } from '../utils/MeetingsUtils';
import { fetchOrCreateMeeting } from '../api/project';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Video from './meeting/Video'; 


const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const VideosContainer = styled.div`
  flex: 10;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const UserVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const VideoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  width: 100%;
`;

const ControlButton = styled.div`
  cursor: pointer;
  text-align: center;
  margin: 0 10px;
  i {
    font-size: 24px;
  }
  span {
    display: block;
  }
`;

const ChatContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #ddd;
`;

const ChatHeader = styled.div`
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-weight: bold;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

const Message = styled.p`
  margin: 5px 0;
`;

const MessageForm = styled.form`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
`;

const SendButton = styled.i`
  cursor: pointer;
  margin-left: 10px;
  font-size: 24px;
`;

const MeetingsPage = () => {
  const activeProject = useSelector(state => state.activeProject);
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideoRef = useRef();
  const messageRef = useRef();
  const screenCaptureStream = useRef();
  const [meetingId, setMeetingId] = useState('');
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [webcamStream, setWebCamStream] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const currentPeers = useRef([]);

  useEffect(() => {
    const initMeeting = async () => {
      try {
        const { data } = await fetchOrCreateMeeting(activeProject.id);
        const { meetingId } = data;
        setMeetingId(meetingId);

        const { socket, webcamStream } = await MeetingService.connectToSocketAndWebcamStream(localStorage.getItem('token'));
        socketRef.current = socket;
        setWebCamStream(webcamStream);

        if (userVideoRef.current) {
            userVideoRef.current.srcObject = webcamStream;
        }

        console.log(webcamStream);

        MeetingService.setupSocketListeners(socket, webcamStream, setPeers, screenCaptureStream.current, currentPeers.current, setMessages, meetingId);
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong, please try again later!');
      }
    };

    initMeeting();

    return async () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      await stopAllVideoAudioMedia();
    };
  }, [activeProject]);

  const stopAllVideoAudioMedia = async () => {
    // Destroying previous stream (screen capture stream)
    const previousScreenCaptureStream = screenCaptureStream.current;
    if (previousScreenCaptureStream) {
      const previousScreenCaptureStreamTracks = previousScreenCaptureStream.getTracks();
      previousScreenCaptureStreamTracks.forEach(track => {
        track.stop();
      });
    }

    // Destroying previous stream (webcam stream)
    const previousWebcamStream = webcamStream;
    if (previousWebcamStream) {
      const previousWebcamStreamTracks = previousWebcamStream.getTracks();
      previousWebcamStreamTracks.forEach(track => {
        track.stop();
      });
    }
  };

  const handleOnClickAudioToggle = () => {
    muteOrUnmuteAudio(webcamStream, isAudioMuted, setIsAudioMuted);
  };

  const handlePlayOrStopVideo = () => {
    playOrStopVideo(webcamStream, isVideoMuted, setIsVideoMuted);
  };

  const handleShareScreen = async () => {
    await shareScreen(peers, screenCaptureStream, webcamStream, peers, userVideoRef.current, setIsAudioMuted, setIsVideoMuted);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(e, socketRef.current, meetingId, messageRef.current);
  };

  const leaveMeeting = () => {
    navigate('/');
  };

  return (
    <Container>
      <VideosContainer>
        <UserVideo muted ref={userVideoRef} autoPlay playsInline />
        <VideoGrid>
          {peers.map((peer) => (
            console.log(0),
            <Video key={peer.peerId} peer={peer.peer} />
          ))}
        </VideoGrid>
        <Controls>
          <ControlButton onClick={handleOnClickAudioToggle}>
            {isAudioMuted ? <i className="unmute fas fa-microphone-slash" /> : <i className="fas fa-microphone" />}
            {isAudioMuted ? <span>Unmute</span> : <span>Mute</span>}
          </ControlButton>
          <ControlButton onClick={handlePlayOrStopVideo}>
            {isVideoMuted ? <i className="stop fas fa-video-slash" /> : <i className="fas fa-video" />}
            {isVideoMuted ? <span>Play Video</span> : <span>Stop Video</span>}
          </ControlButton>
          <ControlButton onClick={handleShareScreen}>
            <i className="fas fa-shield-alt" />
            <span>Share Screen</span>
          </ControlButton>
          <ControlButton onClick={leaveMeeting}>
            <span className="leave_meeting">Leave Meeting</span>
          </ControlButton>
        </Controls>
      </VideosContainer>
      <ChatContainer>
        <ChatHeader>Chat</ChatHeader>
        <MessagesContainer>
          {messages.map((message, index) => (
            <Message key={index}>{message.name}({message.username}): {message.message}</Message>
          ))}
        </MessagesContainer>
        <MessageForm onSubmit={handleSendMessage}>
          <MessageInput ref={messageRef} type="text" placeholder="Type message here..." />
          <SendButton onClick={handleSendMessage} className="fa fa-paper-plane" />
        </MessageForm>
      </ChatContainer>
    </Container>
  );
};

export default MeetingsPage;
