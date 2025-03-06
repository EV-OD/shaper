# Node Description

The Shaper application implements a node-editor architecture for constructing and manipulating geometry via dynamic data flows. Each node encapsulates a distinct operation or data source, exposing inputs, outputs, and configurable properties. This document provides a comprehensive description of each node category, their properties (props), and common use cases.

---

## 1. Vector Nodes

Vector nodes handle 3D vector arithmetic and visualization, serving as essential inputs for transformations and directional computations.

### a. VectorNode
- **File:** `src/component/widgets/nodes/vectorNode.tsx`
- **Props:**  
  - `updateNodeData`: Callback to update the node’s internal state.
  - Internal state representing the vector using a `Vector` instance.
- **Use Cases:**  
  - Providing vector values as inputs for transformation nodes.
  - Driving directional calculations in complex scenes.

### b. VectorAdd
- **File:** `src/component/widgets/nodes/vectorAdd.tsx`
- **Props:**  
  - Two vector inputs (A and B) received via custom handles.
  - `updateNodeData`: Function to output the sum of the two vectors.
- **Use Cases:**  
  - Merging two directional inputs.
  - Supplying combined vector outputs for further processing.

### c. VectorSub
- **File:** `src/component/widgets/nodes/vectorSub.tsx`
- **Props:**  
  - Two vector inputs (A and B) delivered via custom handles.
  - `updateNodeData`: Function to output the difference between vectors.
- **Use Cases:**  
  - Calculating directional offsets.
  - Providing data for nodes that require vector differences.

### d. VectorViewNode
- **File:** `src/component/widgets/nodes/vectorView.tsx`
- **Props:**  
  - Input vector from connected nodes via `useNodesData`.
  - Integration with a centralized store using `useStore` for real-time updates.
- **Use Cases:**  
  - Visual representation of a 3D vector.
  - Debugging and real-time monitoring of vector values.

### e. CombineVectorNode
- **File:** `src/component/widgets/nodes/combineVector.tsx`
- **Props:**  
  - Individual vector components as separate inputs (X, Y, Z).
  - `updateNodeData`: Callback to output the combined vector.
- **Use Cases:**  
  - Aggregating separate vector components into a unified vector.
  - Feeding comprehensive vector data to transformation nodes.

### f. RandomVector (Input)
- **File:** Typically part of input vector types in `src/utils/CustomNode.ts`
- **Props:**  
  - Generates random vector components.
  - Uses `updateNodeData` to pass the generated vector to connected nodes.
- **Use Cases:**  
  - Procedural vector generation for testing or creative randomness.
  - Input for dynamic transformations based on stochastic behavior.

---

## 2. Geometry (Geo) Nodes

Geometry nodes convert vector and numeric data into geometric shapes and are fundamental in constructing visual elements.

### a. PlaneGeoNode
- **File:** `src/component/widgets/nodes/PlaneGeoNode.tsx`
- **Props:**  
  - Dimensions such as width, height, and segment counts.
  - `updateNodeData`: Outputs the constructed plane geometry.
- **Use Cases:**  
  - Creating flat surfaces for backgrounds or base geometry.
  - Serving as a foundation for more complex extrusions or deformations.

### b. CubeGeoNode
- **File:** `src/component/widgets/nodes/CubeGeoNode.tsx`
- **Props:**  
  - Dimensions: width, height, depth, and segments.
  - Utilizes `updateNodeData` to return a box geometry.
- **Use Cases:**  
  - Generating cubic or box-like shapes.
  - Establishing baseline geometry for modifiers such as extrusions.

### c. GeoViewNode
- **File:** `src/component/widgets/nodes/GeoViewNode.tsx`
- **Props:**  
  - Receives a geometry object via `useNodesData`.
  - Updates the geometry store for rendering.
- **Use Cases:**  
  - Displaying current geometry within the viewport.
  - Debugging and allowing real-time visualization of geometric transformations.

### d. RotateGeoNode
- **File:** `src/component/widgets/nodes/RotateGeoNode.tsx`
- **Props:**  
  - Accepts both geometry and a vector for rotation angles.
  - Clones and rotates the geometry according to the supplied vector.
- **Use Cases:**  
  - Adjusting orientation of geometries.
  - Dynamic rotation based on computed vector data.

### e. TranslateGeoNode
- **File:** `src/component/widgets/nodes/TranslateGeoNode.tsx`
- **Props:**  
  - Combines geometry input with a translation vector from `useNodesData`.
  - Applies translation to the geometry and updates the node data.
- **Use Cases:**  
  - Shifting geometries within the scene.
  - Positioning parts of a composite geometry accordingly.

### f. ScaleGeoNode
- **File:** `src/component/widgets/nodes/ScaleGeoNode.tsx`
- **Props:**  
  - Receives geometry and a scale factor vector.
  - Scales the geometry dynamically prior to updating node data.
- **Use Cases:**  
  - Uniform or non-uniform scaling of geometries.
  - Adjusting the overall proportions of model components.

### g. ModelNode (ImportModel)
- **File:** `src/component/widgets/nodes/ImportModel.tsx`
- **Props:**  
  - Accepts a file input (commonly a `.glb` file).
  - Uses `GLTFLoader` to load and parse the model file.
- **Use Cases:**  
  - Integrating external 3D assets.
  - Enabling the import of complex models into the node graph.

### h. ToMeshNode
- **File:** `src/component/widgets/nodes/ToMeshNode.tsx`
- **Props:**  
  - Converts geometry into a renderable mesh.
  - Accepts color and material parameters to enhance visual output.
- **Use Cases:**  
  - Transitioning geometry into mesh form for display.
  - Preparing geometry for material application and final rendering.

### i. MeshViewNode
- **File:** `src/component/widgets/nodes/MeshViewNode.tsx`
- **Props:**  
  - Receives a mesh instance.
  - Updates the mesh store for real-time rendering.
- **Use Cases:**  
  - Visual confirmation of the final mesh output.
  - Debugging mesh conversions within the node graph.

### j. GroupMeshNode
- **File:** `src/component/widgets/nodes/GroupNode.tsx`
- **Props:**  
  - Aggregates multiple mesh inputs.
  - Uses `updateNodeData` to combine meshes into a single grouped instance.
- **Use Cases:**  
  - Merging several mesh outputs for collective transformation.
  - Organizing complex scenes by grouping related elements.

---

## 3. Value Nodes

Value nodes generate and manipulate scalar data, often serving as parameters or triggers for other operations.

### a. RandomNode
- **File:** `src/component/widgets/nodes/randomNode.tsx`
- **Props:**  
  - Configuration for minimum and maximum bounds.
  - `updateNodeData`: Outputs a random number within the defined range.
- **Use Cases:**  
  - Introducing controlled randomness into processes.
  - Varying parameters for procedural generation.

### b. ValueNode
- **File:** `src/component/widgets/nodes/valueNode.tsx`
- **Props:**  
  - Accepts static or dynamic numerical input via user interaction.
  - Uses `updateNodeData` to output the provided value.
- **Use Cases:**  
  - Providing constant parameters for downstream processing.
  - Acting as a base for modulation by other nodes.

### c. NoiseNode
- **File:** `src/component/widgets/nodes/noiseNode.tsx`
- **Props:**  
  - Parameters include scale, detail, roughness, and distortion.
  - Optionally incorporates vector inputs for noise variation.
- **Use Cases:**  
  - Generating procedural noise for textures or displacement maps.
  - Creating variability in vertex positions or material attributes.

### d. ClampNode
- **File:** `src/component/widgets/nodes/ClampNode.tsx`
- **Props:**  
  - Defines minimum and maximum values.
  - Clamps the input value to retain it within specified bounds.
- **Use Cases:**  
  - Preventing values from exceeding operational limits.
  - Ensuring numerical data remains within acceptable thresholds for further processing.

---

## 4. Transform Nodes

Transform nodes modify geometries or meshes using translation, rotation, or scaling parameters.

### a. TranslateMeshNode
- **File:** `src/component/widgets/nodes/TranslateMeshNode.tsx`
- **Props:**  
  - Inputs: A mesh (target) and a translation vector.
  - Applies the vector offset to shift the mesh’s position.
- **Use Cases:**  
  - Rearranging mesh elements within the scene.
  - Fine-tuning positions after composite transformations.

### b. RotateGeoNode & ScaleGeoNode
- **Covered under Geometry Nodes.**
- **Use Cases:**  
  - Rotating or scaling geometries based on dynamic inputs.
  - Adjusting orientation and size for proper model alignment.

---

## 5. Instance Nodes

Instance nodes utilize geometry inputs to produce multiple instances with individual transformations.

### a. InstancePositionNode
- **File:** `src/component/widgets/nodes/InstancePositionNode.tsx`
- **Props:**  
  - Merges geometry data with vector transformations.
  - Iterates over geometry vertices, applying dynamic position adjustments.
- **Use Cases:**  
  - Creating multiple instances of a model with varying positions.
  - Enabling per-vertex transformations for detailed instancing.

### b. NoGeoInstanceNode
- **File:** `src/component/widgets/nodes/NoGeoInstanceNode.tsx`
- **Props:**  
  - Processes node data by bypassing certain instance-specific modifications.
  - Updates output based on linked data flows rather than direct geometry changes.
- **Use Cases:**  
  - Handling cases where instance positioning is controlled indirectly.
  - Facilitating data propagation without altering the underlying geometry.

---

## 6. Miscellaneous Nodes

These nodes provide additional processing or refining functions to enhance the overall node graph functionality.

### a. ShadeSmoothNode
- **File:** `src/component/widgets/nodes/shadeSmooth.tsx`
- **Props:**  
  - Accepts geometry input.
  - Applies smoothing algorithms like vertex merging and normals computation.
- **Use Cases:**  
  - Enhancing the visual quality of meshes by reducing faceting.
  - Preparing geometry for high-quality rendering in complex scenes.

### b. JoinGeoNode
- **File:** `src/component/widgets/nodes/JoinGeoNode.tsx`
- **Props:**  
  - Combines multiple geometry inputs.
  - Uses utilities such as `BufferGeometryUtils` to merge the geometries.
- **Use Cases:**  
  - Unifying separate geometric elements into a single composite mesh.
  - Simplifying scene hierarchies by reducing the number of discrete geometry nodes.

### c. ToMeshNode & MeshViewNode
- **Already addressed under Geometry Nodes.**
- **Use Cases:**  
  - Transitioning raw geometry into a renderable mesh format.
  - Providing real-time visual feedback for mesh outputs.

---
