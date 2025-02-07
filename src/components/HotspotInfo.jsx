import React, { useState } from 'react';
import { Html } from '@react-three/drei';

const HotSpotInfo = ({ left, top, text, position }) => {
  // 控制信息卡片的显示状态
  const [hovered, setHovered] = useState(false);

  // 若外部传入了 position，则直接使用，否则使用 left 与 top（这要求 left、top 已经转换为 3D 坐标）
  const pos = position || [left, top, 0];

  // 图标样式：大小、鼠标样式等
  const iconStyle = {
    width: '32px',
    height: '32px',
    cursor: 'pointer'
  };

  // 信息卡片样式：通过 CSS transition 实现淡入淡出
  const cardStyle = {
    padding: '10px',
    width: '300px',
    backgroundColor: 'blue',
    color: '#fff',
    fontSize: '20px',
    transition: 'opacity 500ms ease',
    opacity: hovered ? 1 : 0,
    position: 'absolute',
    top: '40px', // 信息卡片相对于图标的偏移，可根据需要调整
    left: '0px'
  };

  return (
    // Html 组件确保该热点位于 Canvas 中，但 pointerEvents 设置为 'none' 使得 Canvas 上其他区域可响应拖拽
    <Html position={pos} style={{ pointerEvents: 'none' }}>
      {/* 外层 div 开启 pointerEvents，以保证内部的交互有效 */}
      <div style={{ pointerEvents: 'auto', position: 'relative', display: 'inline-block' }}>
        <img
          src="/info.png" // 确保 info.png 文件在 public 目录中或根据你的项目配置引入图片
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
