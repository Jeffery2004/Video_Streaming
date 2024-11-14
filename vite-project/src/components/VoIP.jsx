// components/VoIP.jsx
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Peer from "simple-peer";

const VoIPContainer = styled.div`
  margin: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background-color: #f3f4f6;
  border-radius: 12px;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const VoIPButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  font-size: 1em;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
`;

const Video = styled.video`
  width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
const VoIP = () => {
  const [peer, setPeer] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const videoRef = useRef(null);

  const startVideoCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;

    const newPeer = new Peer({ initiator: true, trickle: false, stream });
    setPeer(newPeer);
  };

  const shareScreen = async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    setScreenStream(screenStream);

    peer.replaceTrack(
      peer.streams[0].getVideoTracks()[0], 
      screenStream.getVideoTracks()[0], 
      peer.streams[0]
    );

    screenStream.getVideoTracks()[0].onended = () => {
      peer.replaceTrack(
        screenStream.getVideoTracks()[0],
        peer.streams[0].getVideoTracks()[0],
        peer.streams[0]
      );
    };
  };

  const recordSession = () => {
    alert("Recording session... (Recording logic to be implemented)");
  };

  return (
    <VoIPContainer>
      <h2>Video Call Feature</h2>
      <Video ref={videoRef} autoPlay playsInline />
      <VoIPButton onClick={startVideoCall}>Start Video Call</VoIPButton>
      <VoIPButton onClick={shareScreen}>Share Screen</VoIPButton>
      <VoIPButton onClick={recordSession}>Record Session</VoIPButton>
    </VoIPContainer>
  );
};

export default VoIP;
