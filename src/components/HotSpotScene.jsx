import React, { useState } from 'react';
import { Html } from '@react-three/drei';

export default function HotSpotScene({ text, onClick, position }) {
  const [hovered, setHovered] = useState(false);

  const pos = position;

  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    width: 200,
    height: 50,
    backgroundColor: hovered ? '#339f0f' : '#64ec36',
    cursor: 'pointer',
  };

  const textStyle = {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
  };

  return (
    <Html position={pos} style={{ pointerEvents: 'none' }}>
      <div
        style={{ pointerEvents: 'auto' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <div style={boxStyle}>
          <span style={textStyle}>{text}</span>
        </div>
      </div>
    </Html>
  );
}
