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
    console.log(0);
    console.log('Peer received in Video component:', peer);
    peer.on('stream', stream => {
    console.log('Stream received in Video component:', stream);
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

export default Video;
