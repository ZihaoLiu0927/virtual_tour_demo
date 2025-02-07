import React, { useState } from 'react';
import { Html } from '@react-three/drei';

const HotSpotInfo = ({ text, position }) => {
  const [hovered, setHovered] = useState(false);

  const pos = position;

  const iconStyle = {
    width: '32px',
    height: '32px',
    cursor: 'pointer'
  };

  const cardStyle = {
    padding: '10px',
    width: '300px',
    backgroundColor: 'blue',
    color: '#fff',
    fontSize: '20px',
    transition: 'opacity 500ms ease',
    opacity: hovered ? 1 : 0,
    position: 'absolute',
    top: '40px',
    left: '0px'
  };

  return (
    <Html position={pos} style={{ pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto', position: 'relative', display: 'inline-block' }}>
        <img
          src="/info.png"
          alt="info icon"
          style={iconStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
        <div style={cardStyle}>
          {text}
        </div>
      </div>
    </Html>
  );
};

export default HotSpotInfo;
