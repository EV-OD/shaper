import { useDnD } from "../DndContext";
import {
  CustomNodeType,
  GeoNodeTypes,
  valueNodeTypes,
  VectorNodeTypes,
} from "../utils/CustomNode";


const SideBar = () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="overflow-y-auto">
      <div className="description">
        <h1 className="text-2xl font-medium">Nodes</h1>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          <h2>Vector Nodes</h2>
        </div>
        <div className="collapse-content">
          {Object.keys(VectorNodeTypes).map((key) => (
            <div
              key={key}

            >
              <h4>{key.toLocaleUpperCase()}</h4>
              {Object.keys(VectorNodeTypes[key]).map((node) => (
                <div
                  key={node}
                  className="dndnode"
                  onDragStart={(event) => onDragStart(event, node)}
                  draggable
                >
                  {node}
                </div>
              ))}
            </div>
          ))}          

        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          <h2>Geo Nodes</h2>
        </div>
        <div className="collapse-content">
          {Object.keys(GeoNodeTypes).map((key) => (
            <div
              key={key}
            >
              <h4>{key.toLocaleUpperCase()}</h4>
              {Object.keys(GeoNodeTypes[key]).map((node) => (
                <div
                  key={node}
                  className="dndnode"
                  onDragStart={(event) => onDragStart(event, node)}
                  draggable
                >
                  {node}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          <h2>Value Nodes</h2>
        </div>
        <div className="collapse-content">
          {Object.keys(valueNodeTypes).map((key) => (
            <div
              key={key}
              className="dndnode"
              onDragStart={(event) => onDragStart(event, key)}
              draggable
            >
              {key}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

      {/* {CustomNodeType && Object.keys(CustomNodeType).map((key) => (
        <div key={key} className="dndnode" onDragStart={(event) => onDragStart(event, key)} draggable>
            {key}
        </div>
        ))} */}