// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Decal,
  useTexture,
  useContextBridge,
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  useCursor,
} from "@react-three/drei";
import { Lamborghini } from "./Lamborghini";
import { Model as Buc } from "./Buc";
import CardsMenu from "./CardsMenu";
import { Ground } from "./Ground";
// import { Rings } from './Rings'
import * as React from "react";
import { useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useControls } from "leva";
import { Suspense } from "react";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

// const envHDR = './abandoned_greenhouse_2k/abandoned_greenhouse_2k.hdr'
// const envHDR = '/neon_photostudio_4k.hdr'
// const envHDR = '/concrete_tunnel_02_4k.hdr'
// const envHDR = '/teufelsberg_lookout_4k.hdr'
// const envHDR = '/abandoned_greenhouse_4k.hdr'
// const envHDR = '/teufelsberg_roof_4k.hdr'
// const envHDR = '/industrial_workshop_foundry_4k.hdr'
// const envHDR = '/concrete_tunnel_02_4k.hdr'
// const envHDR = '/HDR_Light_Studio_Free_HDRI_Design_07.exr'
// const envHDR = '/HDR_Light_Studio_Free_HDRI_Design_25.hdr'
// const envHDR = '/short_tunnel_4k.hdr'
const envHDR = "/small_hangar_02_4k.hdr";
// const envHDR = "/LA_Downtown_Helipad_GoldenHour_3k.hdr";

// const envHDR = "/portland_landing_pad_4k.hdr";

type ThemeContextType = {
  colors: { red: string; green: string; blue: string };
} | null;
type MenuContextType = {
  selectedItem: boolean;
  setSelectedItem: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  isMenuContentVisible: boolean;
  setIsMenuContentVisible: React.Dispatch<React.SetStateAction<boolean>>;
} | null;

export const ThemeContext = React.createContext<ThemeContextType>(null);
export const MenuContext = React.createContext<MenuContextType>(null);
const lookAtPos = new THREE.Vector3();

function SceneWrapper() {
  const ContextBridge = useContextBridge(ThemeContext, MenuContext);

  const {
    groundHeight,
    groundRadius,
    UVScale,
    decal1X,
    decal1Y,
    decal1Z,
    decal2X,
    decal2Y,
    decal2Z,
  } = useControls({
    groundHeight: { value: 42, min: 0, max: 200 },
    groundRadius: { value: 250, min: 0, max: 1000 },
    UVScale: { value: 0.001, min: 0.001, max: 0.05 },
    decal1X: { value: 135, min: -500, max: 500 },
    decal1Y: { value: 240, min: -500, max: 500 },
    decal1Z: { value: 0, min: -500, max: 500 },
    decal2X: { value: 265, min: -500, max: 500 },
    decal2Y: { value: 240, min: -500, max: 500 },
    decal2Z: { value: 0, min: -500, max: 500 },
  });
  const decalsPosition = {
    decal1X,
    decal1Y,
    decal1Z,
    decal2X,
    decal2Y,
    decal2Z,
  };
  const ref = React.useRef();

  // const [reactMap, threeMap] = useTexture(['/decals/decal1.jpg', '/decals/decal2.jpg'])

  return (
    <>
      <ContextBridge>
        <Canvas gl={{ toneMappingExposure: 0.41 }}>
          {/* <Decal mesh={ref} {...props}>
        <meshPhysicalMaterial
          roughness={0.2}
          transparent
          depthTest={false}
          map={Math.random() > 0.5 ? reactMap : threeMap}
          alphaTest={0}
          polygonOffset={true}
          polygonOffsetFactor={-10}
        />
      </Decal> */}
          <Suspense fallback={null}>
            <Environment
              files={envHDR}
              ground={{ height: groundHeight, radius: groundRadius }}
            />

            {/* <Lamborghini rotation={[0.0, 0, -0.005]} scale={0.07} position={[0, 17, 0]} envMap={envHDR} UVScale={UVScale} /> */}
            <Buc
              scale={0.07}
              position={[0, 17, 0]}
              decalsPosition={decalsPosition}
            />
            <ContactShadows
              renderOrder={2}
              frames={1}
              resolution={1024}
              scale={120}
              blur={2}
              opacity={1.6}
              far={100}
            />
            {/* <Dodecahedron position={[-1, 2, 0.5]} scale={0.75} /> */}
          </Suspense>
          {/* <Menu /> */}
          <OrbitControls
            enableZoom
            enablePan={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.25}
            makeDefault
          />
          <PerspectiveCamera makeDefault position={[-30, 10, 120]} fov={35} />
        </Canvas>

        <CardsMenu />
      </ContextBridge>
    </>
  );
}
function App() {
  const [name, setName] = React.useState("");
  const [isMenuContentVisible, setIsMenuContentVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(false);
  console.log("isMenuContentVisible", isMenuContentVisible);
  return (
    // Provide several contexts from above the Canvas
    // This mimics the standard behavior of composing them
    // in the `App.tsx` or `index.tsx` files
    <ThemeContext.Provider
      value={{ colors: { red: "#ff0000", green: "#00ff00", blue: "#0000ff" } }}
    >
      <MenuContext.Provider
        value={{
          selectedItem,
          setSelectedItem,
          name,
          setName,
          isMenuContentVisible,
          setIsMenuContentVisible,
        }}
      >
        <SceneWrapper />
      </MenuContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
