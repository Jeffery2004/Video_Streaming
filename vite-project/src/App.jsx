import React from "react";
import { GlobalStyle } from "./styles/GlobalStyles";
import VideoPlayer from "./components/VideoPlayer";
import PlanUpgrade from "./components/PlanUpgrade";
import VoIP from "./components/VoIP";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <h1>Video Streaming Platform</h1>
      <VideoPlayer />
      <PlanUpgrade />
      <VoIP />
    </div>
  );
};

export default App;