import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* The hero "system": a slowly-breathing constellation of nodes — a few of
   them brass (the signals worth building) — inside a faint wireframe shell.
   It reacts to the pointer, pauses for reduced-motion, and is lazy-loaded
   so three.js never touches the main bundle. */

const NODE_COUNT = 120;
const RADIUS = 2.1;
const LINK_DISTANCE = 0.72;

const BRASS = new THREE.Color("hsl(41, 96%, 58%)");
const DIM = new THREE.Color("hsl(224, 20%, 62%)");

/** Fibonacci sphere with mild radial jitter — organic but structured. */
function generatePoints(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = 0.82 + ((i * 9301 + 49297) % 233) / 233 * 0.36;
    pts.push(
      new THREE.Vector3(
        Math.cos(theta) * r * RADIUS * jitter,
        y * RADIUS * jitter,
        Math.sin(theta) * r * RADIUS * jitter
      )
    );
  }
  return pts;
}

const Constellation = () => {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(generatePoints, []);

  const { nodeGeometry, linkGeometry } = useMemo(() => {
    // Instanced-style merged node geometry: one small octahedron per point
    const node = new THREE.OctahedronGeometry(0.05, 0);
    const merged: THREE.BufferGeometry[] = [];
    const colors: number[] = [];
    points.forEach((p, i) => {
      const g = node.clone().translate(p.x, p.y, p.z);
      const isBrass = i % 7 === 0;
      const c = isBrass ? BRASS : DIM;
      const count = g.attributes.position.count;
      for (let v = 0; v < count; v++) colors.push(c.r, c.g, c.b);
      merged.push(g);
    });
    const nodeGeometry = mergeGeometries(merged);
    nodeGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    // Links between near neighbours
    const linkPositions: number[] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < LINK_DISTANCE) {
          linkPositions.push(
            points[i].x, points[i].y, points[i].z,
            points[j].x, points[j].y, points[j].z
          );
        }
      }
    }
    const linkGeometry = new THREE.BufferGeometry();
    linkGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linkPositions, 3));
    return { nodeGeometry, linkGeometry };
  }, [points]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    // Pointer parallax — eased so it feels weighty, not twitchy
    const targetX = state.pointer.y * 0.22;
    const targetZ = -state.pointer.x * 0.16;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.04;
    // Slow breathing
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.015;
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <mesh geometry={nodeGeometry}>
        <meshBasicMaterial vertexColors />
      </mesh>
      <lineSegments geometry={linkGeometry}>
        <lineBasicMaterial color={"hsl(224, 18%, 38%)"} transparent opacity={0.4} />
      </lineSegments>
      <mesh>
        <icosahedronGeometry args={[RADIUS * 1.22, 1]} />
        <meshBasicMaterial wireframe color={"hsl(224, 16%, 22%)"} transparent opacity={0.22} />
      </mesh>
    </group>
  );
};

/** Minimal geometry merge — avoids pulling in three/examples utils. */
function mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];
  let offset = 0;
  for (const g of geometries) {
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
    const idx = g.index;
    if (idx) {
      for (let i = 0; i < idx.count; i++) indices.push(idx.getX(i) + offset);
    } else {
      // Non-indexed geometry (e.g. OctahedronGeometry): positions are a
      // triangle soup, so index them sequentially.
      for (let i = 0; i < pos.count; i++) indices.push(i + offset);
    }
    offset += pos.count;
  }
  const merged = new THREE.BufferGeometry();
  merged.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  merged.setIndex(indices);
  return merged;
}

const SystemScene = () => (
  <Canvas
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 7.4], fov: 42 }}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    style={{ background: "transparent" }}
  >
    <Constellation />
  </Canvas>
);

export default SystemScene;
