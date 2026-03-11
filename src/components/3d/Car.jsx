import { useRef, useEffect } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Annotation Component for Callouts
const Annotation = ({ title, position, onClick }) => (
    <Html position={position} center zIndexRange={[100, 0]}>
        <div className="annotation" onClick={onClick}>
            <div className="annotation-dot" />
            {title}
        </div>
    </Html>
)

const Car = ({ isInterior, openDoors, openHood, setOpenDoors, setOpenHood, setIsInterior }) => {
    // Load exactly a real 3D supercar model
    const { scene, materials } = useGLTF('/ferrari.glb')
    const carGroup = useRef()

    // Customize the model to look like a Dark Sci-Fi Hypercar
    useEffect(() => {
        if (!materials) return;

        Object.values(materials).forEach((mat) => {
            // Dark Matte/Metallic Body
            if (mat.name.toLowerCase().includes('body') || mat.name.toLowerCase().includes('paint') || mat.name.toLowerCase().includes('metal')) {
                mat.color.set('#1a1a1a') // Lightened to make it visible
                mat.roughness = 0.4
                mat.metalness = 0.7
                mat.clearcoat = 1.0
            }
            // Glass transparency - hidden when inside to see the stars!
            if (mat.name.toLowerCase().includes('glass') || mat.name.toLowerCase().includes('window')) {
                mat.transparent = true
                mat.opacity = isInterior ? 0.0 : 0.5
                mat.color.set('#222222')
                mat.metalness = 0.8
                mat.roughness = 0.1
            }
            // Glowing neon rims
            if (mat.name.toLowerCase().includes('rim') || mat.name.toLowerCase().includes('alloy') || mat.name.toLowerCase().includes('wheel')) {
                mat.color.set('#000000')
                mat.emissive.set('#00e5ff')
                mat.emissiveIntensity = 3
            }
            // Glowing Headlights and Taillights
            if (mat.name.toLowerCase().includes('light') || mat.name.toLowerCase().includes('emissive')) {
                mat.emissive.set('#00e5ff')
                mat.emissiveIntensity = 8
                mat.color.set('#ffffff')
            }
        })
    }, [materials, isInterior])

    return (
        <group ref={carGroup}>
            {/* Annotations matching user's image exactly */}
            {!isInterior && (
                <>
                    <Annotation title="Laser Headlights" position={[0.8, 0.7, 2.2]} onClick={() => { }} />
                    <Annotation title="Electric Core" position={[0, 1.2, 0.5]} onClick={() => setOpenHood(!openHood)} />
                    <Annotation title="Luxurious Interior" position={[2, 0.8, 0]} onClick={() => setIsInterior(true)} />
                    <Annotation title="Supercar Doors" position={[-2, 1.5, 0]} onClick={() => setOpenDoors(!openDoors)} />
                </>
            )}

            {/* The Real High-Fidelity 3D Car Model */}
            <primitive
                object={scene}
                scale={1}
                position={[0, 0, 0]}
            />

            {/* Glowing Neon Underglow */}
            {!isInterior && (
                <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[2.5, 5]} />
                    <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
                </mesh>
            )}

            {/* INTERIOR HOLOGRAPHIC DASHBOARD */}
            {isInterior && (
                <group position={[0, 0.75, 0.5]}>
                    <mesh rotation={[-Math.PI / 6, 0, 0]} position={[0, 0, 0]}>
                        <planeGeometry args={[0.5, 0.3]} />
                        <meshStandardMaterial color="#000" transparent opacity={0.8} />
                        <Html transform distanceFactor={0.4} position={[0, 0, 0.01]}>
                            <div style={{
                                width: '280px', height: '180px',
                                background: 'rgba(0, 15, 30, 0.9)',
                                border: '1px solid #00e5ff',
                                borderRadius: '10px',
                                padding: '15px',
                                color: '#00e5ff',
                                fontFamily: 'Orbitron',
                                display: 'flex', flexDirection: 'column',
                                boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)'
                            }}>
                                <div style={{ fontSize: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>SYSTEM NOMINAL</span>
                                    <span>BATTERY: 98%</span>
                                </div>
                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                    <div style={{ fontSize: '48px', fontWeight: 'bold' }}>83</div>
                                    <div style={{ fontSize: '12px' }}>KM / H</div>
                                </div>
                                <div style={{ margin: 'auto' }}>
                                    <div style={{ width: '100%', height: '2px', background: '#00e5ff55' }}><div style={{ width: '40%', height: '100%', background: '#00e5ff' }}></div></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ padding: '5px 10px', background: 'rgba(0, 229, 255, 0.2)', borderRadius: '5px', fontSize: '10px' }}>NAV</div>
                                    <div style={{ padding: '5px 10px', background: 'rgba(0, 229, 255, 0.2)', borderRadius: '5px', fontSize: '10px' }}>MEDIA</div>
                                </div>
                            </div>
                        </Html>
                    </mesh>

                    {/* Interior Glowing Light */}
                    <pointLight position={[0, 0.2, -0.2]} intensity={5} color="#00e5ff" distance={3} />
                </group>
            )}
        </group>
    )
}

// Preload the huge 3D file so it renders instantly
useGLTF.preload('/ferrari.glb')

export default Car
