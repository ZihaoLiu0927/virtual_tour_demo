import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import HotSpotScene from './components/HotSpotScene';
import HotSpotTitle from './components/HotSpotTitle';
import HotSpotInfo from './components/HotspotInfo';
import { OrbitControls } from '@react-three/drei';

// A helper component that loads a panorama texture and sets it as the scene background.
const Background = forwardRef(({ panorama }, ref) => {
  const texture = useLoader(THREE.TextureLoader, panorama);
  const meshRef = useRef();

  useImperativeHandle(ref, () => meshRef.current);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[800, 80, 60]} />
      <meshBasicMaterial side={THREE.BackSide} map={texture} />
    </mesh>
  );
});

function ClickHandler({ bgMeshRef, onHotspotCreate }) {
  const { camera, gl, scene } = useThree();
  const raycaster = new THREE.Raycaster();
  
  const handleClick = (event) => {
    // 计算鼠标标准化设备坐标
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(bgMeshRef.current);
    
    if (intersects.length > 0) {
      const point = intersects[0].point;  // precise 3D coordinate
      onHotspotCreate({
        type: "info",
        position: [point.x, point.y, point.z],
        text: "New Hotspot"
      });
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('click', handleClick);
    // clean func，remove event listener when component unmount
    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [gl.domElement, camera]);

  return null;
}

export default function SceneManager({ firstSceneId, scenes }) {
  const [currentSceneId, setCurrentSceneId] = useState(firstSceneId);
  const [isDevMode, setIsDevMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bgMeshRef = useRef();

  // Find a scene by its ID.
  const getSceneById = (sceneId) => scenes.find((scene) => scene.sceneId === sceneId);
  const currentScene = getSceneById(currentSceneId);

  // Handle scene navigation when a "scene" type hotspot is clicked.
  const handleHotSpotSceneClick = (sceneToGo) => {
    setCurrentSceneId(sceneToGo.sceneId);
  };

  const handleHotspotCreate = (hotspot) => {
    console.log('create hotspot data: ', hotspot);
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
      const position = hotSpot.position 
      ? hotSpot.position 
      : screenToWorld(hotSpot.left, hotSpot.top);

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

  const handleMouseMove = (event) => {
    if (!isDevMode) return;
    
    setMousePos({
      x: event.clientX,
      y: event.clientY
    });
  };

  // press D to toggle dev mode
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
        <Background ref={bgMeshRef} panorama={currentScene.panorama} />
        {isDevMode && <ClickHandler bgMeshRef={bgMeshRef} onHotspotCreate={handleHotspotCreate} />}
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
