import { useMemo } from 'react'
import { applyProps, useFrame } from '@react-three/fiber'
import {
  Decal,
  useEnvironment,
  useGLTF,
  useCursor,
  useTexture,
  Text,
  Environment,
  OrbitControls,
  RenderTexture,
  RandomizedLight,
  PerspectiveCamera,
  AccumulativeShadows
} from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'
/*
Author: Steven Grey (https://sketchfab.com/Steven007)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/lamborghini-urus-2650599973b649ddb4460ff6c03e4aa2
Title: Lamborghini Urus
*/

const lookAtPos = new THREE.Vector3()
// const name = (type) => `Metal009_2K_${type}.jpg`
export function Lamborghini(props) {
  const { scene, nodes, materials } = useGLTF('/buc.glb')
  const texture = useTexture('/decals/decal1.jpg')

  const { UVScale } = props

  // const [colorMap, displacementMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
  //   name('Color'),
  //   name('Displacement'),
  //   name('NormalDX'),
  //   name('Roughness')
  //   // name('AmbientOcclusion')
  // ])
  const { envMap } = props
  useFrame((state, delta) => {
    // const step = 0.1
    // state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
    // state.camera.position.lerp(dummy.set(zoom ? 25 : 10, zoom ? 1 : 5, zoom ? 0 : 10), step)

    // lookAtPos.x = Math.sin(state.clock.getElapsedTime() * 2)
    lookAtPos.y = 20

    state.camera.lookAt(lookAtPos)
    state.camera.updateProjectionMatrix()
  })
  // console.log('scene, nodes, materials', scene, nodes, materials)
  useMemo(() => {
    // ⬇⬇⬇ All this is probably better fixed in Blender ...
    // console.log('colorMap', colorMap)
    // let material = new THREE.MeshStandardMaterial({
    //   displacementScale: 0.8,
    //   // map: colorMap,
    //   displacementMap: displacementMap,
    //   normalMap: normalMap,

    //   roughnessMap: roughnessMap,
    //   metalness: 0.9,
    //   roughness: 0.4
    //   // aoMap: aoMap
    // })

    // Object.assign(materials.Material, {
    //   roughness: 0,
    //   metalness: 0.25,
    //   emissive: new THREE.Color(0x000000),
    //   color: 0x0000aa,
    //   envMapIntensity: 0.5 })
    console.log('nodess', nodes)

    Object.values(nodes).forEach((node) => {
      // console.log('node uuid', node?.uuid)
      if (node.name === 'frame') {
        ;<mesh castShadow receiveShadow geometry={node.geometry} {...props} dispose={null}>
          <meshStandardMaterial color="black" roughness={0} metalness={0.5} />
          //{' '}
          <Decal debug position={[0, 1.2, 0.75]} rotation={0.3} scale={[10.9, 10.25, 11]}>
            //{' '}
            <meshStandardMaterial roughness={0.6} transparent polygonOffset polygonOffsetFactor={-10}>
              //{' '}
              <RenderTexture attach="map" anisotropy={16}>
                // <PerspectiveCamera makeDefault manual aspect={0.9 / 0.25} position={[0, 0, 5]} />
                // <color attach="background" args={['#af2040']} />
                // <ambientLight intensity={0.5} />
                // <directionalLight position={[10, 10, 5]} />
                //{' '}
                {/* <Text rotation={[0, Math.PI, 0]} ref={textRef} fontSize={4} color="white">
          //         hello from drei
          //       </Text> */}
                // {/* <Dodecahedron /> */}
                //{' '}
              </RenderTexture>
              //{' '}
            </meshStandardMaterial>
            //{' '}
          </Decal>
          <Decal debug position={[-1.0, 1.75, 0.6]} rotation={-0.7} scale={0.25} map={texture} map-anisotropy={16} />
        </mesh>
        // console.log('node', node)
        // node.material.roughnessMap.repeat.set(UVScale, UVScale)
        // node.material.color.set(0xaaaaaa)
        // node.material = material
        // node.material.transparent = truemetalnessMap
        // node.material.opacity = 1
        // Fix glas, normals look messed up in the original, most likely deformed meshes bc of compression :/
        // if (node.name.startsWith('glass')) node.geometry.computeVertexNormals()
        // Fix logo, too dark
        // node.material = applyProps(materials.BreakDiscs.clone(), { color: '#ddd' })
      }
    })
    // // Fix windows, they have to be inset some more
    // // nodes['glass_003'].scale.setScalar(2.7)
    // // Fix inner frame, too light
    // applyProps(materials.FrameBlack, { metalness: 0.75, roughness: 0, color: 'black' })
    // // Wheels, change color from chrome to black matte
    // applyProps(materials.Chrome, { metalness: 1, roughness: 0, color: '#333' })
    // applyProps(materials.BreakDiscs, { metalness: 0.2, roughness: 0.2, color: '#555' })
    // applyProps(materials.TiresGum, { metalness: 0, roughness: 0.4, color: '#181818' })
    // applyProps(materials.GreyElements, { metalness: 0, color: '#292929' })
    // // Make front and tail LEDs emit light
    // applyProps(materials.emitbrake, { emissiveIntensity: 3, toneMapped: false })
    // applyProps(materials.LightsFrontLed, { emissiveIntensity: 3, toneMapped: false })
    // // Paint, from yellow to black
    // nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
    //   roughness: 0.3,
    //   metalness: 0.05,
    //   color: '#111',
    //   envMapIntensity: 0.75,
    //   clearcoatRoughness: 0,
    //   clearcoat: 1
    // })
  }, [nodes, materials, UVScale])
  return <primitive object={scene} {...props} />
}
