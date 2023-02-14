import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Decal, useTexture, ContactShadows, OrbitControls, PerspectiveCamera, useCursor } from '@react-three/drei'
import { Lamborghini } from './Lamborghini'
import { Model as Buc } from './Buc'
import { Ground } from './Ground'
import { Rings } from './Rings'
import * as React from 'react'
import { useLoader } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { useControls } from 'leva'
import { Suspense } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

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
const envHDR = '/small_hangar_02_4k.hdr'
// const envHDR = '/portland_landing_pad_4k.hdr'

const lookAtPos = new THREE.Vector3()
export default function App() {
  const { groundHeight, groundRadius, UVScale, decalX, decalY, decalZ } = useControls({
    groundHeight: { value: 42, min: 0, max: 200 },
    groundRadius: { value: 250, min: 0, max: 1000 },
    UVScale: { value: 0.001, min: 0.001, max: 0.05 },
    decalX: { value: 265, min: -500, max: 500 },
    decalY: { value: 240, min: -500, max: 500 },
    decalZ: { value: 0, min: -500, max: 500 }
  })

  const ref = React.useRef()

  // const [reactMap, threeMap] = useTexture(['/decals/decal1.jpg', '/decals/decal2.jpg'])

  return (
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
        <Environment files={envHDR} ground={{ height: groundHeight, radius: groundRadius }} />

        {/* <Lamborghini rotation={[0.0, 0, -0.005]} scale={0.07} position={[0, 17, 0]} envMap={envHDR} UVScale={UVScale} /> */}
        <Buc scale={0.07} position={[0, 17, 0]} decalX={decalX} decalY={decalY} decalZ={decalZ} />
        <ContactShadows renderOrder={2} frames={1} resolution={1024} scale={120} blur={2} opacity={1.6} far={100} />
        {/* <Dodecahedron position={[-1, 2, 0.5]} scale={0.75} /> */}
      </Suspense>
      <OrbitControls enableZoom enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.25} makeDefault />
      <PerspectiveCamera makeDefault position={[-30, 10, 120]} fov={35} />
    </Canvas>
  )
}
function Dodecahedron(props) {
  const meshRef = useRef()
  const texture = useTexture('/decals/decal1.jpg')
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useCursor(hovered)
  useFrame((state, delta) => (meshRef.current.rotation.x = meshRef.current.rotation.y += delta))
  return (
    <group {...props}>
      <mesh
        ref={meshRef}
        scale={clicked ? 2.25 : 1.75}
        onClick={() => click(!clicked)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}>
        <dodecahedronGeometry args={[0.75]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'goldenrod'} />
        <Decal debug position={[0, -0.2, 0.5]} scale={0.75} map={texture} map-anisotropy={16} />
      </mesh>
    </group>
  )
}
