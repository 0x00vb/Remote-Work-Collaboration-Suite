import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledVideo = styled.video`
  width: 200px;
  height: 150px;
  margin: 5px;
`;

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', stream => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

export default Video;
