import React, { useState } from 'react';
import { Html } from '@react-three/drei';

export default function HotSpotScene({ text, onClick, position }) {
  const [hovered, setHovered] = useState(false);

  const containerStyle = {
    pointerEvents: 'auto',
    position: 'relative',
    transform: 'translate(-50%, -50%)',
    transformOrigin: 'center center'
  };

  const ringStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: `3px solid ${hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'}`,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: hovered ? '0 0 10px rgba(255, 255, 255, 0.7)' : 'none',
    animation: 'pulse 2s infinite'
  };

  const textStyle = {
    position: 'absolute',
    bottom: '-25px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#ffffff',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    opacity: hovered ? 1 : 0.7,
    transition: 'opacity 0.3s ease'
  };

  return (
    <Html position={position} style={{ pointerEvents: 'none' }}>
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
            }
            70% {
              box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            }
          }
        `}
      </style>
      <div style={containerStyle}>
        <div
          style={ringStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onClick}
        >
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.3s ease'
          }} />
        </div>
        {text && <div style={textStyle}>{text}</div>}
      </div>
    </Html>
  );
}
