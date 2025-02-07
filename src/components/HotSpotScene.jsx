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
    // 设置外层Html的 pointerEvents 为 'none'
    <Html position={pos} style={{ pointerEvents: 'none' }}>
      {/* 内层div设置 pointerEvents 为 'auto'，确保按钮本身可交互 */}
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
