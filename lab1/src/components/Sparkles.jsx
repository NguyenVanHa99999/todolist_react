// src/components/Sparkles.jsx
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function Sparkles({ active }) {
  const reduce = useReducedMotion();
  const items = new Array(6).fill(0).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 40,
    y: (Math.random() - 0.5) * 6,
    delay: i * 0.04,
  }));

  return (
    <div aria-hidden style={{ position: "absolute", top: -6, right: 6, zIndex: 5 }}>
      <AnimatePresence>
        {active && items.map((p) => (
          <motion.span
            key={p.id}
            initial={{ y: 0, opacity: 0, scale: 0.6 }}
            animate={{ y: -18, opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: p.delay }}
            style={{
              position: "absolute",
              transform: `translateX(${p.x}px)`,
              width: 6, height: 6, borderRadius: 9999,
              background: "conic-gradient(from 45deg, #22c55e, #60a5fa, #facc15, #22c55e)",
              boxShadow: "0 0 6px rgba(255,255,255,.35)"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
