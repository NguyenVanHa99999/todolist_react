// src/components/DragTrashZone.jsx
import { forwardRef } from "react";
import { motion } from "framer-motion";

const DragTrashZone = forwardRef(function DragTrashZone({ active }, ref) {
  return (
    <motion.div
      ref={ref}
      className="trash-zone"
      initial={false}
      animate={active ? { scale: 1, opacity: 1 } : { scale: 0.92, opacity: 0.65 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      style={{
        position: "absolute",
        right: 12,
        bottom: 12,
        borderRadius: 16,
        padding: "10px 14px",
        background: "rgba(239,68,68,0.15)",
        border: "1px dashed rgba(239,68,68,0.45)",
        color: "#ef4444",
        pointerEvents: "none",
        zIndex: 30
      }}
    >
      <span style={{ fontSize: 18, marginRight: 8 }}>🗑️</span>
      <b>Kéo vào đây để xoá</b>
    </motion.div>
  );
});

export default DragTrashZone;
