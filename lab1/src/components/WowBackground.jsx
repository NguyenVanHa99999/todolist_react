// src/components/WowBackground.jsx
import { motion, useReducedMotion } from "framer-motion";

export default function WowBackground() {
  const reduce = useReducedMotion();
  const common = {
    transition: { duration: reduce ? 0 : 20, repeat: Infinity, repeatType: "mirror" }
  };

  return (
    <div
      aria-hidden
      className="wow-bg"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      {/* Blob 1 */}
      <motion.div
        className="wow-blob"
        style={{
          position: "absolute",
          width: 420, height: 420, borderRadius: 9999,
          filter: "blur(60px)",
          background: "radial-gradient(closest-side, rgba(96,165,250,.35), rgba(96,165,250,0))",
          top: -120, left: -80,
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 30, 10, 0], scale: [1, 1.08, 0.98, 1] }}
        {...common}
      />
      {/* Blob 2 */}
      <motion.div
        className="wow-blob"
        style={{
          position: "absolute",
          width: 380, height: 380, borderRadius: 9999,
          filter: "blur(60px)",
          background: "radial-gradient(closest-side, rgba(34,197,94,.28), rgba(34,197,94,0))",
          bottom: -140, right: -60,
        }}
        animate={{ x: [0, -30, 20, 0], y: [0, -40, -10, 0], scale: [1, 0.95, 1.05, 1] }}
        {...common}
      />
      {/* Blob 3 */}
      <motion.div
        className="wow-blob"
        style={{
          position: "absolute",
          width: 300, height: 300, borderRadius: 9999,
          filter: "blur(60px)",
          background: "radial-gradient(closest-side, rgba(250,204,21,.26), rgba(250,204,21,0))",
          top: 120, right: 180,
        }}
        animate={{ x: [0, 20, -25, 0], y: [0, -15, 25, 0], scale: [1, 1.06, 0.97, 1] }}
        {...common}
      />
    </div>
  );
}
