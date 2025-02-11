type ArgsObjType = {
    vector?: ArgsVectorType,
    value?: unknown,
    geometry?: unknown
}

export type ArgsVectorType = {
    x: {
        f: () => number
    },
    y: {
        f: () => number
    },
    z: {
        f: () => number
    }
}





export default ArgsObjType;