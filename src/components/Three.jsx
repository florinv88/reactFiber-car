import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import { useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import Car from './Car'

function Three() {

    let angle = -Math.PI / 2

    // Code to move the camera
    const orbitControlsRef = useRef(null)
    useFrame((state) => {
        if (orbitControlsRef.current) {
            const { x, y } = state.mouse

            //modificam pozitia camerei din orbitControl
            orbitControlsRef.current.setAzimuthalAngle(-x * Math.PI / 180 * 45)
            orbitControlsRef.current.setPolarAngle((y + 1) * Math.PI / 180 * 60)
            orbitControlsRef.current.update()

        }

    })

    // Animation
    const ballRef = useRef(null)
    useEffect(() => {
        if (ballRef.current) {

            //TIMELINE

            const t1 = gsap.timeline()

            //x-axis animation
            t1.to(ballRef.current.position,
                {
                    x: 1,
                    duration: 3,
                    ease: "power2.out"

                })

            //y-axis motions
            t1.to(ballRef.current.position, {
                y: 0.5,
                duration: 1.5,
                ease: "bounce.out"
            }, "<")



        }

    }, [ballRef.current])

    return (
        <>

            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls
                ref={orbitControlsRef}
                minPolarAngle={Math.PI / 180 * 60}
                maxPolarAngle={Math.PI / 180 * 80}
            />


            {/* Ball*/}
            <mesh position={[-2, 3, 0]} castShadow ref={ballRef}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color={0xffffff} metalness={0.6} roughness={0.3} />


            </mesh>

            {/** Car*/}
            <Car position={[-1, 0, -2]} />

            {/* Floor*/}

            <mesh rotation={[angle, 0, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh>

            {/* Directional Light

            <directionalLight args={['#ffffff', 1]} position={[-3, 1, 0]} />*/}

            {/* Ambient Light*/}
            <ambientLight args={["#ffffff", 0.25]} />

            {/* Point Light
            <pointLight args={['#ffffff', 1]} position={[-2, 0.5, 0]} />*/}

            {/* Spot Light*/}
            <spotLight args={['#ffffff', 1.5, 7, (Math.PI / 180) * 45, 0.4]} position={[-3, 1, 0]} castShadow />

            <Environment background >
                <mesh>
                    <sphereGeometry args={[50, 100, 100]} />
                    <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
                </mesh>
            </Environment>


        </>
    )
}

export default Three