import { useDnD } from "../DndContext";
import {
  GeoNodeTypes,
  valueNodeTypes,
  VectorNodeTypes,
} from "../utils/CustomNode";

import { PiVectorThreeFill } from "react-icons/pi";
import { TbGeometry } from "react-icons/tb";
import { RxValueNone } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SideBar = () => {
  const [_, setType] = useDnD();
  const [openSection, setOpenSection] = useState(null);

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <motion.aside 
      initial={{ x: -250 }} 
      animate={{ x: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-64 h-full bg-zinc-900 text-white p-4 shadow-lg overflow-y-auto"
    >
      <h1 className="text-2xl font-semibold mb-4 border-b border-zinc-700 pb-2">Nodes</h1>
      <div className="space-y-2">
        {[
          { title: "Vector Nodes", nodes: VectorNodeTypes, icon: <PiVectorThreeFill size={20} /> },
          { title: "Geo Nodes", nodes: GeoNodeTypes, icon: <TbGeometry size={20} /> },
          { title: "Value Nodes", nodes: valueNodeTypes, icon: <RxValueNone size={20} /> },
        ].map(({ title, nodes, icon }, index) => (
          <div key={index} className="border border-zinc-700 rounded-lg">
            <button
              onClick={() => toggleSection(index)}
              className="w-full flex items-center justify-between text-sm font-medium p-3 bg-zinc-800 rounded-t-lg focus:outline-none hover:bg-zinc-700 transition-all"
            >
              <span>{title}</span>
              {openSection === index ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
            </button>
            <AnimatePresence>
              {openSection === index && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-4 py-2 bg-zinc-850"
                >
                  {title !== "Value Nodes" ? (
                    Object.keys(nodes).map((key) => (
                      <div key={key}>
                        <h4 className="text-sm font-semibold mt-3 text-zinc-400">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                        <div className="space-y-2">
                          {Object.keys(nodes[key]).map((node) => (
                            <motion.div
                              key={node}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="flex items-center space-x-3 p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 cursor-pointer transition-all"
                              onDragStart={(event) => onDragStart(event, node)}
                              draggable
                            >
                              <div className="flex items-center justify-center w-9 h-9 bg-zinc-700 p-1 rounded-full">
                                {icon}
                              </div>
                              <span className="text-sm capitalize overflow-ellipsis">{node}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-2">
                      {Object.keys(nodes).map((node) => (
                        <motion.div
                          key={node}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="flex items-center space-x-3 p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 cursor-pointer transition-all"
                          onDragStart={(event) => onDragStart(event, node)}
                          draggable
                        >
                          <div className="flex items-center justify-center w-9 h-9 bg-zinc-700 p-1 rounded-full">
                            {icon}
                          </div>
                          <span className="text-sm capitalize overflow-ellipsis">{node}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.aside>
  );
};

export default SideBar;
