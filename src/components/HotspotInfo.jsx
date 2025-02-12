import React, { useState } from 'react';
import { Html } from '@react-three/drei';

const HotSpotInfo = ({ text, position }) => {
  const [hovered, setHovered] = useState(false);

  const containerStyle = {
    pointerEvents: 'auto',
    position: 'relative',
    transform: 'translate(-50%, -50%)', 
    transformOrigin: 'center center'
  };

  const infoIconStyle = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: `2px solid ${hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'}`,
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: hovered ? '0 0 10px rgba(255, 255, 255, 0.7)' : 'none'
  };

  // 创建 "i" 的样式
  const dotStyle = {
    width: '4px',
    height: '4px',
    backgroundColor: hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    position: 'absolute',
    top: '5px',
    transition: 'all 0.3s ease'
  };

  const lineStyle = {
    width: '2px',
    height: '8px',
    backgroundColor: hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: '4px',
    transition: 'all 0.3s ease'
  };

  const cardStyle = {
    padding: '10px',
    width: '300px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    opacity: hovered ? 1 : 0,
    position: 'absolute',
    top: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '8px',
    pointerEvents: 'none',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  return (
    <Html position={position} style={{ pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto', position: 'relative' }}>
        <div
          style={infoIconStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div style={dotStyle} />
          <div style={lineStyle} />
        </div>
        <div style={cardStyle}>
          {text}
        </div>
      </div>
    </Html>
  );
};

export default HotSpotInfo;
