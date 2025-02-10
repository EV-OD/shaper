import React from 'react';
import { Handle, HandleProps, useNodeConnections } from '@xyflow/react';
 
type LimitHandleProps = {
    connectionCount?: number;
    } & HandleProps;

const LimitHandle = (props:LimitHandleProps) => {
  const connections = useNodeConnections({
    handleType: props.type,
    handleId: props.id
  });

  if(!props.connectionCount) {
    return <Handle {...props} />;
  }
 
  return (
    <Handle
      {...props}
      isConnectable={connections.length < props.connectionCount}
    />
  );
};
 
export default LimitHandle;