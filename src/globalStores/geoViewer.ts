import { create } from "zustand";
import { BufferGeometry, Mesh } from "three";

interface GeoState {
  geometry: BufferGeometry | null;
  setGeometry: (geometry: BufferGeometry) => void;
  clearGeometry: () => void;
}

const useGeo = create<GeoState>((set) => ({
  geometry: null,
  setGeometry: (geometry: BufferGeometry) => set({ geometry }),
  clearGeometry: () => set({ geometry: null }),
}));

interface MeshState {
  mesh: Mesh | null;
  setMesh: (mesh: Mesh) => void;
  clearMesh: () => void;
}

export const useMesh = create<MeshState>((set) => ({
  mesh: null,
  setMesh: (mesh: Mesh) => set({ mesh }),
  clearMesh: () => set({ mesh: null }),
}));

export default useGeo;
