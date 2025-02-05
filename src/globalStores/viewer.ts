import { create } from 'zustand'

interface Vector {
    x: number
    y: number
    z: number
}

interface ViewerState {
    vector: Vector
    setVector: (x: number, y: number, z: number) => void
}

const useStore = create<ViewerState>((set) => ({
    vector: { x: 0, y: 0, z: 0 },
    setVector: (x, y, z) => set({ vector: { x, y, z } }),
}))

export {useStore}
