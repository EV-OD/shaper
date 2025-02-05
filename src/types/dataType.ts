import type { Node } from '@xyflow/react';

export type DataType = Node<{
    obj: {
        type: string;
        f: () => number;
    };
}>;
