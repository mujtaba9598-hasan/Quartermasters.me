"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";

extend({ Line_: THREE.Line });

/** Convert lat/lng to 3D position on sphere */
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const connections = [
  { name: "London", lat: 51.5, lng: -0.12 },
  { name: "Singapore", lat: 1.35, lng: 103.8 },
  { name: "New York", lat: 40.71, lng: -74.0 },
  { name: "Dubai", lat: 25.2, lng: 55.27 },
  { name: "Hong Kong", lat: 22.3, lng: 114.17 },
  { name: "Riyadh", lat: 24.7, lng: 46.7 },
];

const ajman = { lat: 25.41, lng: 55.44 };
const GLOBE_RADIUS = 2;

function GlobeWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <meshBasicMaterial
        color="#2d4a40"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function ConnectionBeams() {
  const beamsRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (beamsRef.current) {
      beamsRef.current.rotation.y += delta * 0.06;
    }
  });

  const curves = useMemo(() => {
    const ajmanPos = latLngToVector3(ajman.lat, ajman.lng, GLOBE_RADIUS);
    return connections.map((c) => {
      const target = latLngToVector3(c.lat, c.lng, GLOBE_RADIUS);
      const mid = ajmanPos.clone().add(target).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(GLOBE_RADIUS * 1.4);
      const curve = new THREE.QuadraticBezierCurve3(ajmanPos, mid, target);
      return { curve, name: c.name };
    });
  }, []);

  return (
    <group ref={beamsRef}>
      {curves.map((c, i) => {
        const points = c.curve.getPoints(40).map((p) => [p.x, p.y, p.z] as [number, number, number]);
        return (
          <Line
            key={i}
            points={points}
            color="#C15A2C"
            lineWidth={1}
            transparent
            opacity={0.5}
          />
        );
      })}
    </group>
  );
}

function HQPin() {
  const pinRef = useRef<THREE.Group>(null);
  const ajmanPos = useMemo(
    () => latLngToVector3(ajman.lat, ajman.lng, GLOBE_RADIUS),
    []
  );

  useFrame((_state, delta) => {
    if (pinRef.current) {
      pinRef.current.parent!.rotation.y += delta * 0.06;
    }
  });

  return (
    <group>
      <group ref={pinRef}>
        {/* Pin glow */}
        <mesh position={ajmanPos}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#C15A2C" />
        </mesh>
        {/* Pulse ring */}
        <mesh position={ajmanPos}>
          <ringGeometry args={[0.08, 0.12, 32]} />
          <meshBasicMaterial
            color="#C15A2C"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

function NodePoints() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
    }
  });

  const positions = useMemo(
    () => connections.map((c) => latLngToVector3(c.lat, c.lng, GLOBE_RADIUS)),
    []
  );

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshBasicMaterial color="#8B9E94" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <GlobeWireframe />
      <ConnectionBeams />
      <HQPin />
      <NodePoints />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />
    </>
  );
}

interface GlobeProps {
  className?: string;
}

export function Globe({ className = "" }: GlobeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <GlobeScene />
      </Canvas>

      {/* HQ Data Card on hover */}
      {hovered && (
        <div
          className="glass pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg px-5 py-3"
          style={{ borderColor: "var(--color-accent-gold)" }}
        >
          <p
            className="text-xs font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-accent-gold)",
            }}
          >
            HQ: Ajman Free Zone
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-dim)" }}
          >
            License 37357 &middot; Active Projects: 12
          </p>
        </div>
      )}
    </div>
  );
}
