import React, { useRef, useState } from "react";
import styled from "styled-components";

const VideoPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 20px;
  max-width: 800px;
  margin: auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
  max-height: 500px;
  border-radius: 8px;
  background-color: #000;
  margin-bottom: 15px;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

const ControlButton = styled.button`
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const QualitySelector = styled.select`
  background-color: #333;
  color: #fff;
  padding: 8px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  cursor: pointer;

  option {
    background-color: #333;
    color: #fff;
  }
`;

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [quality, setQuality] = useState("720p");

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
    // Logic to change video quality goes here (e.g., setting a different video source)
  };

  return (
    <VideoPlayerContainer>
      <StyledVideo ref={videoRef} controls>
        {/* Placeholder video source */}
        <source src={`https://path/to/video_${quality}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </StyledVideo>
      <ControlsContainer>
        <ControlButton onClick={handlePlayPause}>Play / Pause</ControlButton>
        <QualitySelector value={quality} onChange={handleQualityChange}>
          <option value="320p">320p</option>
          <option value="480p">480p</option>
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
        </QualitySelector>
      </ControlsContainer>
    </VideoPlayerContainer>
  );
};

export default VideoPlayer;