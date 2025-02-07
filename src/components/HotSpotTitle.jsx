import React from 'react';
import { Html } from '@react-three/drei';

const HotSpotTitle = ({ text, position }) => {
  const pos = position;

  // 定义容器样式
  const containerStyle = {
    padding: '20px',
    backgroundColor: 'blue',
    opacity: 0.8,
    borderRadius: '8px',
  };

  // 定义文字样式
  const textStyle = {
    fontSize: '30px',
    textAlign: 'center',
    margin: 0,
    color: '#fff',
  };

  return (
    <Html position={pos}>
      <div style={containerStyle}>
        <p style={textStyle}>{text}</p>
      </div>
    </Html>
  );
};

export default HotSpotTitle;
