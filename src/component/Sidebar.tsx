import { useDnD } from "../DndContext";
import { CustomNodeType } from "../utils/CustomNode";

 
const SideBar= () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      {CustomNodeType && Object.keys(CustomNodeType).map((key) => (
        <div key={key} className="dndnode" onDragStart={(event) => onDragStart(event, key)} draggable>
            {key}
        </div>
        ))}

    </aside>
  );
};

export default SideBar;