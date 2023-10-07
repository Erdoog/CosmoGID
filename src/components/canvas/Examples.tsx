'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import React from 'react'

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()

  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>
  )
}

export function Planet({planetName, ...props}) {
  var scene : THREE.Group<THREE.Object3DEventMap>
  if (planetName == 'Mercury')
  {
    scene = useGLTF('/Mercury.glb').scene
  }
  else if (planetName == 'Uranus')
  {
    scene = useGLTF('/Uranus.glb').scene
  }
  else if (planetName == 'Moon')
  {
    scene = useGLTF('/Moon.glb').scene
  }
  else if (planetName == 'Jupiter')
  {
    scene = useGLTF('/Jupiter.glb').scene
  }
  else if (planetName == 'Mars')
  {
    scene = useGLTF('/Mars.glb').scene
  }
  else if (planetName == 'Neptune')
  {
    scene = useGLTF('/Neptune.glb').scene
  }
  else if (planetName == 'Venus')
  {
    scene = useGLTF('/Venus.glb').scene
  }
  else if (planetName == 'Saturn')
  {
    scene = useGLTF('/Saturn.glb').scene
  }
  else if (planetName == 'Sun')
  {
    scene = useGLTF('/Sun.glb').scene
  }
  else
  {
    scene = useGLTF('/Earth.glb').scene
  }
  
  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

export function Mercury(props) {
  const { scene } = useGLTF('/Mercury.glb')
  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

export function Venus(props) {
  const { scene } = useGLTF('/Venus.glb')
  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

export function Earth(props) {
  const { scene } = useGLTF('/Earth.glb')
  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

export function Moon(props) {
  const { scene } = useGLTF('/Moon.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

export function Mars(props) {
  const { scene } = useGLTF('/Mars.glb')
  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

export function Jupiter(props) {
  const { scene } = useGLTF('/Jupiter.glb')
  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

export function Saturn(props) {
  const { scene } = useGLTF('/Saturn.glb')
  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

export function Uranus(props) {
  const { scene } = useGLTF('/Uranus.glb')
  useFrame((state, delta) => (scene.rotation.y += delta))
  return <primitive object={scene} {...props} />
}

export function Neptune(props) {
  const { scene } = useGLTF('/Neptune.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

export function Space(props) {
  const { scene } = useGLTF('/dog.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

export function OrbitRing(props) {
  const geometry = new THREE.RingGeometry(1, 5, 32)
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
  const mesh = new THREE.Mesh(geometry, material)
}
