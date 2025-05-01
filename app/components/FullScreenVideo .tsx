import React from 'react';

interface FullScreenVideoProps {
  videoSrc: string;
}

const FullScreenVideo: React.FC<FullScreenVideoProps> = ({ videoSrc }) => {
  return (
    <div style={styles.container} >
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        style={styles.video}
      ></video>
    </div>
  );
};

const styles = {
  container: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden' as const,
    zIndex: 0 as const,
  },
  video: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    zIndex: 0 as const,
    objectFit: 'cover' as const,
  },
};

export default FullScreenVideo;
