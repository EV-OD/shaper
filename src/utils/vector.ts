export type vectorItem = {
    obj: {
        type: string;
        f: () => number;
    };
};

export class Vector {
    private data: { type: "instance"; f: () => number; x?: any; y?: any; z?: any }[];

    constructor(data: number[]);
    constructor(data: vectorItem[]);
    constructor(data: number[] | vectorItem[]) {
        if (data.length === 0) {
            throw new Error("Vector must have at least one element.");
        }
        if (typeof data[0] === "number") {
            this.data = (data as number[]).map((value, idx) => ({
                type: "instance", 
                f: () => value,
                x: idx === 0 ? value : undefined,
                y: idx === 1 ? value : undefined,
                z: idx === 2 ? value : undefined
            }));
        } else {
            this.data = (data as vectorItem[]).map((value, idx) => ({
                type: "instance", 
                f: value.obj.f,
                x: idx === 0 ? value : undefined,
                y: idx === 1 ? value : undefined,
                z: idx === 2 ? value : undefined
            }));
        }
    }


    public dimension(): number {
        return this.data.length;
    }

    public toArray(): number[] {
        return this.data.map(obj => obj.f());
    }

    public get x() {
        return this.data[0];
    }

    public get y() {
        if (this.dimension() < 2) {
            throw new Error("Vector does not have a y value.");
        }
        return this.data[1];
    }

    public get z() {
        if (this.dimension() < 3) {
            throw new Error("Vector does not have a z value.");
        }
        return this.data[2];
    }

    public add(other: Vector): Vector {
        this._ensureSameDimension(other);
        const result = this.data.map((obj, idx) => ({
            type: "instance",
            f: () => obj.f() + other.data[idx].f(),
            x: obj,
            y: other.data[idx],
            z: idx === 2 ? { type: "instance", f: () => obj.f() + other.data[idx].f() } : undefined
        }));
        return new Vector(result.map(r => r.f()));
    }

    public subtract(other: Vector): Vector {
        this._ensureSameDimension(other);
        const result = this.data.map((obj, idx) => ({
            type: "instance",
            f: () => obj.f() - other.data[idx].f(),
            x: obj,
            y: other.data[idx],
            z: idx === 2 ? { type: "instance", f: () => obj.f() - other.data[idx].f() } : undefined
        }));
        return new Vector(result.map(r => r.f()));
    }

    public scalarMultiply(scalar: number): Vector {
        const result = this.data.map((obj, idx) => ({
            type: "instance",
            f: () => obj.f() * scalar,
            x: obj,
            z: idx === 2 ? { type: "instance", f: () => obj.f() * scalar } : undefined
        }));
        return new Vector(result.map(r => r.f()));
    }

    public dot(other: Vector): { type: "instance"; f: () => number; x: any; y: any; z?: any } {
        this._ensureSameDimension(other);
        return {
            type: "instance",
            f: () => this.data.reduce((sum, obj, idx) => sum + obj.f() * other.data[idx].f(), 0),
            x: this,
            y: other,
            z: this.dimension() > 2 ? { type: "instance", f: () => this.data[2].f() * other.data[2].f() } : undefined
        };
    }

    public magnitude(): { type: "instance"; f: () => number; x: any; z?: any } {
        return {
            type: "instance",
            f: () => Math.sqrt(this.data.reduce((sum, obj) => sum + obj.f() ** 2, 0)),
            x: this,
            z: this.dimension() > 2 ? { type: "instance", f: () => Math.sqrt(this.data[2].f() ** 2) } : undefined
        };
    }

    private _ensureSameDimension(other: Vector): void {
        if (this.dimension() !== other.dimension()) {
            throw new Error("Vectors must have the same dimension.");
        }
    }
}

export default Vector;