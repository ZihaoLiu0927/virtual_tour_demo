import React from 'react';
import { Html } from '@react-three/drei';

const HotSpotTitle = ({ left, top, text, position }) => {
  // 如果外部传入了 position，则直接使用该 3D 坐标；否则使用 left、top，并补 0 作为 Z 坐标
  const pos = position || [left, top, 0];

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
    // 使用 <Html> 组件，将该元素挂载到 3D 场景中。设置 pointerEvents 为 'none'
    // 以避免遮挡 Canvas 中 OrbitControls 的拖拽事件（若组件不需要交互）
    <Html position={pos} style={{ pointerEvents: 'none' }}>
      <div style={containerStyle}>
        <p style={textStyle}>Kamu berada di</p>
        <p style={textStyle}>{text}</p>
      </div>
    </Html>
  );
};

export default HotSpotTitle;
