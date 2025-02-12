import React, { useState } from 'react';
import { Html } from '@react-three/drei';

const HotSpotTitle = ({ text, position }) => {
  const [hovered, setHovered] = useState(false);

  const containerStyle = {
    padding: '8px 16px',
    backgroundColor: hovered ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.6)',
    borderRadius: '20px',
    transform: 'translate(-50%, -50%)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: hovered 
      ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
      : '0 2px 8px rgba(0, 0, 0, 0.2)'
  };

  const textStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff',
    margin: 0,
    whiteSpace: 'nowrap',
    textAlign: 'center',
    letterSpacing: '0.5px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    opacity: hovered ? 1 : 0.9,
    transition: 'opacity 0.3s ease'
  };

  return (
    <Html position={position}>
      <div 
        style={containerStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p style={textStyle}>{text}</p>
      </div>
    </Html>
  );
};

export default HotSpotTitle;
