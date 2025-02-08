import { GizmoHelper, GizmoViewport, Grid, PerspectiveCamera } from "@react-three/drei";
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
        <mesh geometry={geometry} position={[0,0.5,0]} receiveShadow castShadow>
            <meshStandardMaterial />
        </mesh>
}

      <Grid
        args={[1000, 1000]}
        cellSize={1}
        cellColor={"#cccccc"}
        cellThickness={1.0}
        sectionSize={5}
        sectionColor={"#ff3e00"}
        sectionThickness={2}
        fadeDistance={100}
        fadeStrength={5.9} 
        /> 
      <directionalLight  position={[0, 0, 5]} />

      {/* <ambientLight intensity={0.5} /> */}
      <PerspectiveCamera makeDefault  position={[4,4,4]}>
      <spotLight position={[0, 5, 0]} angle={0.6} penumbra={1} decay={0.9} intensity={20} receiveShadow castShadow />
      <pointLight position={[10,10,10]} intensity={70} />

      <OrbitControls>
      <GizmoHelper
  alignment="bottom-right" 
  margin={[80, 80]} 
>
  <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
  {/* alternative: <GizmoViewcube /> */}
</GizmoHelper>
      </OrbitControls>
      </PerspectiveCamera>
      <mesh rotation={[Math.PI / -2 , 0,0]} position={[0,-0.01,0]} receiveShadow castShadow>
        <planeGeometry args={[100,100]} />
        <meshStandardMaterial
        color={"orange"}
        />
      </mesh>
    </>
  );
}

export default ViewPort;
