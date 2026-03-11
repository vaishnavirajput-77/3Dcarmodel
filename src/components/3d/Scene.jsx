import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Stars, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Car from './Car'

const Scene = ({ isInterior, openDoors, openHood, setOpenDoors, setOpenHood, setIsInterior }) => {
    return (
        <Canvas
            shadows={true}
            dpr={1} // Lock dpr to 1 to avoid webgl context crash on low end machines
        >
            <PerspectiveCamera
                makeDefault
                position={isInterior ? [0, 0.45, -0.4] : [5, 2.5, 6]}
                fov={isInterior ? 90 : 45} // Wider FOV for internal view
            />

            <ambientLight intensity={0.5} color="#ffffff" />

            {/* Main Key Light */}
            <spotLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" angle={0.5} penumbra={1} castShadow />

            {/* Front Fill/Rim Light - very important for silhouette */}
            <spotLight position={[0, 2, 8]} intensity={2} color="#00e5ff" angle={0.6} penumbra={0.5} />

            {/* Back Rim Light */}
            <spotLight position={[0, 5, -8]} intensity={2} color="#7000ff" angle={0.5} penumbra={0.5} />

            {/* Side Rim Light */}
            <pointLight position={[-5, 2, 0]} intensity={1} color="#00e5ff" />
            <pointLight position={[5, 2, 0]} intensity={1} color="#ffffff" />

            {/* Dark Studio Environment */}
            <Environment preset="night" />

            {/* Starry Sky - Visible essentially only from interior looking up through roof */}
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            <Car
                isInterior={isInterior}
                openDoors={openDoors}
                openHood={openHood}
                setOpenDoors={setOpenDoors}
                setOpenHood={setOpenHood}
                setIsInterior={setIsInterior}
            />

            {!isInterior && (
                <>
                    {/* Glowing ring on the floor beneath the car */}
                    <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[3, 3.1, 64]} />
                        <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} />
                    </mesh>
                    <ContactShadows resolution={1024} scale={15} blur={2.5} opacity={0.8} far={5} color="#000000" />
                </>
            )}

            {/* Crucial for glowing lights (dashboard, ambient lighting) */}
            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} intensity={0.5} />
            </EffectComposer>

            <OrbitControls
                enablePan={false}
                makeDefault
                autoRotate={!isInterior && !openDoors && !openHood}
                autoRotateSpeed={0.5}
                minDistance={isInterior ? 0.01 : 4}
                maxDistance={isInterior ? 0.5 : 12}
                minPolarAngle={isInterior ? 0 : 1.0}
                maxPolarAngle={isInterior ? Math.PI : Math.PI / 2 - 0.05}
                rotateSpeed={isInterior ? -0.4 : 0.8}
                target={isInterior ? [0, 0.45, -0.401] : [0, 0.5, 0]}
            />
        </Canvas>
    )
}

export default Scene
