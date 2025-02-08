import { GizmoHelper, Grid, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

import { OrbitControls } from "@react-three/drei";
import useGeo from "../../globalStores/geoViewer";
import { useMemo } from "react";

function ViewPort() {
    const geo = useGeo(state=> state.geometry)

    const geometry = useMemo(() => {
        if(geo){
            geo.attributes.position.needsUpdate = true;
            geo.computeVertexNormals(); 
        }
        return geo;
      }, [geo]);

  return (
    <>
      {/* <mesh position={[0,0.7,0]} receiveShadow castShadow>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
        {geometry && 
        <mesh geometry={geometry} position={[0,1,0]} receiveShadow castShadow>
            <meshStandardMaterial />
        </mesh>
}

      {/* <Grid
        args={[100, 100]}
        cellSize={1}
        cellColor={"#cccccc"}
        cellThickness={1.0}
        sectionSize={5}
        sectionColor={"#ff3e00"}
        sectionThickness={2}
        fadeDistance={100}
        fadeStrength={5.9}      /> */}
      <directionalLight color="red" position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <PerspectiveCamera makeDefault  position={[4,4,4]}>
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} decay={0.5} intensity={Math.PI} receiveShadow castShadow />
      <pointLight position={[4, 4, 0]} intensity={70} />

      <OrbitControls>
        <GizmoHelper/>
      </OrbitControls>
      </PerspectiveCamera>
      <mesh rotation={[Math.PI / -2 , 0,0]} position={[0,-0.001,0]} receiveShadow castShadow>
        <planeGeometry args={[100,100]} />
        <meshStandardMaterial
        color={"orange"}
        />
      </mesh>
    </>
  );
}

export default ViewPort;
