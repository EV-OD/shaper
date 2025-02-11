import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

function fastBlenderNoise(
    x: number,
    y: number,
    scale: number = 100,
    detail: number = 3,
    roughness: number = 0.1,
    distortion: number = 0.0
): number {
    let total: number = 0;
    let amplitude: number = 1;
    let frequency: number = scale;
    let maxValue: number = 0;

    // Assume noise2D is defined elsewhere, e.g., imported from a noise library.
    const dx: number = distortion * noise2D(x, y);
    const dy: number = distortion * noise2D(y, x);

    for (let i = 0; i < detail; i++) {
        const nx: number = (x + dx) * frequency;
        const ny: number = (y + dy) * frequency;

        total += noise2D(nx, ny) * amplitude;
        maxValue += amplitude;

        amplitude *= roughness;
        frequency *= 2; // Lacunarity = 2 (Blender default)
    }

    return total / maxValue; // Normalize
}

export { fastBlenderNoise };
