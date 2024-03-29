import React from "react";
import planeScene from "../assets/celera.glb";
import { useGLTF } from "@react-three/drei";
const Plane = () => {
  const { scene, animations } = useGLTF(planeScene);
  return (
    <mesh>
      <primitive object={scene} />
    </mesh>
  );
};
useGLTF.preload(planeScene);
export default Plane;
