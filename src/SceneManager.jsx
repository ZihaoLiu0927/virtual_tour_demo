import React, { useState, useEffect } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import HotSpotScene from './components/HotSpotScene';
import HotSpotTitle from './components/HotSpotTitle';
import HotSpotInfo from './components/HotspotInfo';
import { OrbitControls } from '@react-three/drei';

// A helper component that loads a panorama texture and sets it as the scene background.
function Background({ panorama }) {
  const texture = useLoader(THREE.TextureLoader, panorama);
  
  return (
    <mesh>
      <sphereGeometry args={[800, 80, 60]} />
      <meshBasicMaterial 
        side={THREE.BackSide}
        map={texture}
      />
    </mesh>
  );
}

export default function SceneManager({ firstSceneId, scenes }) {
  const [currentSceneId, setCurrentSceneId] = useState(firstSceneId);
  const [isDevMode, setIsDevMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Find a scene by its ID.
  const getSceneById = (sceneId) => scenes.find((scene) => scene.sceneId === sceneId);
  const currentScene = getSceneById(currentSceneId);

  // Handle scene navigation when a "scene" type hotspot is clicked.
  const handleHotSpotSceneClick = (sceneToGo) => {
    setCurrentSceneId(sceneToGo.sceneId);
  };

  // Convert 2D screen coordinates to 3D world coordinates
  const screenToWorld = (left, top) => {
    // Convert from pixel coordinates to normalized device coordinates (-1 to +1)
    const x = (left / window.innerWidth) * 2 - 1;
    const y = -(top / window.innerHeight) * 2 + 1;
    // Project onto sphere
    const radius = 10;
    const phi = (x * Math.PI) / 2;
    const theta = (y * Math.PI) / 2;
    return [
      radius * Math.cos(phi) * Math.cos(theta),
      radius * Math.sin(theta),
      radius * Math.sin(phi) * Math.cos(theta)
    ];
  };

  // Render hotspots based on their type.
  const renderHotSpots = (hotSpots = []) =>
    hotSpots.map((hotSpot, i) => {
      // Convert screen coordinates to world coordinates
      const position = screenToWorld(hotSpot.left, hotSpot.top);

      switch (hotSpot.type) {
        case 'scene': {
          const sceneToGo = getSceneById(hotSpot.sceneId);
          return (
            <HotSpotScene
              key={i}
              onClick={() => handleHotSpotSceneClick(sceneToGo)}
              text={hotSpot.text}
              position={position}
            />
          );
        }
        case 'info': {
          return (
            <HotSpotInfo
              key={i}
              text={hotSpot.text}
              position={position}
            />
          );
        }
        case 'title': {
          return (
            <HotSpotTitle
              key={i}
              text={hotSpot.text}
              position={position}
            />
          );
        }
        default:
          return null;
      }
    });

  // 添加点击处理函数
  const handleCanvasClick = (event) => {
    // 获取点击位置相对于窗口的坐标
    const left = event.clientX;
    const top = event.clientY;
    
    console.log('Clicked at:', { 
      left, 
      top,
      // 为tour.json格式化输出
      hotSpot: {
        type: "info",
        left: left,
        top: top,
        text: "New Hotspot"
      }
    });
  };

  const handleMouseMove = (event) => {
    if (!isDevMode) return;
    
    setMousePos({
      x: event.clientX,
      y: event.clientY
    });
  };

  // 切换开发模式（按D键）
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'd' || event.key === 'D') {
        setIsDevMode(!isDevMode);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [isDevMode]);

  if (!currentScene) return null;

  return (
    <div 
      style={{ width: '100vw', height: '100vh' }}
      onClick={handleCanvasClick}  // 添加点击监听
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{
          fov: 85,
          near: 0.1,
          far: 1000,
          position: [2, 2, 0.1]
        }}
      >
        <Background panorama={currentScene.panorama} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={-0.3}
          enableDamping
          dampingFactor={0.5}
          reverseOrbit
        />
        {renderHotSpots(currentScene.hotSpots)}
      </Canvas>

      {/* 开发模式UI */}
      {isDevMode && (
        <div style={{
          position: 'fixed',
          top: 10,
          left: 10,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: 10,
          borderRadius: 5,
          zIndex: 1000
        }}>
          <p>开发模式</p>
          <p>坐标: left={mousePos.x}, top={mousePos.y}</p>
          <p>按D键退出</p>
        </div>
      )}
    </div>
  );
}
