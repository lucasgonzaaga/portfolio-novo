import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = ({ theme }) => {
    const sphereRef = useRef();
    const materialRef = useRef();

    useFrame(({ clock, mouse }) => {
        const t = clock.getElapsedTime();

        const x = mouse.x;
        const y = mouse.y;
        const dist = Math.sqrt(x * x + y * y);

        const targetDistort = THREE.MathUtils.lerp(0.8, 0.3, dist);

        if (sphereRef.current) {
            sphereRef.current.rotation.x = t * 0.2;
            sphereRef.current.rotation.y = t * 0.3;
            sphereRef.current.position.y = Math.sin(t) * 0.2;
        }

        if (materialRef.current) {
            materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.1);
        }
    });

    return (
        <Sphere visible args={[1, 100, 200]} scale={2} ref={sphereRef}>
            <MeshDistortMaterial
                ref={materialRef}
                color={theme === 'dark' ? "#8352FD" : "#1e1b4b"}
                attach="material"
                distort={0.3}
                speed={2}
                roughness={0.2}
            />
        </Sphere>
    );
};

const Hero = ({ theme }) => {
    return (
        <section id="home" className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-[var(--color-bg)]">
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <AnimatedSphere theme={theme} />
                    <OrbitControls enableZoom={false} />
                </Canvas>
            </div>
            <div className="z-10 text-center pointer-events-none px-4 mix-blend-difference text-white">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                    Olá, eu sou o Lucas Gonzaga!
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light">
                    Novo softplayer do time de desenvolvimento front-end :)
                </p>
            </div>
        </section>
    );
};

export default Hero;
