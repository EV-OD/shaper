import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  PerspectiveCamera,
} from "@react-three/drei";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import * as THREE from "three";

import { OrbitControls } from "@react-three/drei";
import useGeo, { useMesh } from "../../globalStores/geoViewer";
import { useMemo, useState } from "react";

function ViewPort() {
  const geo = useGeo((state) => state.geometry);
  const mesh = useMesh((state) => state.mesh);

  const geometry = useMemo(() => {
    if (geo) {
      geo.attributes.position.needsUpdate = true;
      geo.computeBoundingSphere();
    }
    return geo;
  }, [geo]);

  return (
    <>
      {/* <mesh position={[0,0.7,0]} receiveShadow castShadow>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
      {geometry && (
        <mesh
          geometry={geometry}
          position={[0, 0.5, 0]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial color={"#FAD5A5"} />
        </mesh>
      )}

      {mesh && <primitive object={mesh} receiveShadow castShadow />}

      <Grid
        args={[1000, 1000]}
        cellSize={1}
        cellColor={"#cccccc"}
        cellThickness={1.0}
        sectionSize={5}
        sectionColor={"rgb(150,150,100)"}
        sectionThickness={2}
        fadeDistance={100}
        fadeStrength={5.9}
      />
      <directionalLight position={[0, 0, 5]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={70} />
      <PerspectiveCamera makeDefault position={[4, 4, 4]}>
        <spotLight
          position={[0, 5, 0]}
          angle={0.6}
          penumbra={1}
          decay={0.9}
          intensity={10}
          receiveShadow
          castShadow
        />

        <OrbitControls>
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={["red", "green", "blue"]}
              labelColor="black"
            />
            {/* alternative: <GizmoViewcube /> */}
          </GizmoHelper>
        </OrbitControls>
      </PerspectiveCamera>
      <mesh
        rotation={[Math.PI / -2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
        castShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"rgb(100,100,100)"} />
      </mesh>
    </>
  );
}

export default ViewPort;
