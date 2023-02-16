import { Box, Text, Environment, Lightformer, Decal, useTexture, ContactShadows, OrbitControls, PerspectiveCamera, useCursor } from '@react-three/drei'
import * as React from 'react'

import { ThemeContext, MenuContext } from './App'
export default function Menu() {
  const theme = React.useContext(ThemeContext)
  const greeting = React.useContext(MenuContext)
  return (
    <>
      <Box
        position-x={-4}
        args={[3, 2]}
        material-color={theme.colors.red}
        onClick={() => greeting.setName(theme.colors.red)}
      />
      <Box
        position-x={0}
        args={[3, 2]}
        material-color={theme.colors.green}
        onClick={() => greeting.setName(theme.colors.green)}
      />
      <Box
        position-x={4}
        args={[3, 2]}
        material-color={theme.colors.blue}
        onClick={() => greeting.setName(theme.colors.blue)}
      />

      <React.Suspense fallback={null}>
        <Text fontSize={3} position-z={2}>
          {greeting.name ? `Hello ${greeting.name}!` : 'Click a color'}
        </Text>
      </React.Suspense>
    </>
  )
}