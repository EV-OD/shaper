import {create} from 'zustand';
import { BufferGeometry } from 'three';

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

export default useGeo;