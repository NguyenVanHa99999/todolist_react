// src/components/ParticlesBurst.jsx
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

/** fireKey tăng -> nổ lại. Nếu có x,y -> nổ tại toạ độ (so với container cha). */
export default function ParticlesBurst({ fireKey = 0, amount = 28, x, y }) {
  const reduce = useReducedMotion();
  const shards = useMemo(() => {
    const arr = [];
    for (let i = 0; i < amount; i++) {
      const angle = (Math.PI * 2 * i) / amount + Math.random() * 0.6;
      const distance = 90 + Math.random() * 90;
      const size = 6 + Math.random() * 8;
      const rotate = Math.random() * 360;
      const color = ["#60a5fa", "#22c55e", "#facc15", "#e879f9"][i % 4];
      arr.push({ angle, distance, size, rotate, color, id: i });
    }
    return arr;
  }, [fireKey, amount]);

  const left = x ?? "calc(100% - 130px)";
  const top = y ?? 110;

  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 40 }}>
      <AnimatePresence key={fireKey}>
        {fireKey > 0 &&
          shards.map(s => (
            <motion.span
              key={`${fireKey}-${s.id}`}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.6, rotate: 0 }}
              animate={{
                x: Math.cos(s.angle) * s.distance,
                y: Math.sin(s.angle) * s.distance,
                opacity: 0,
                scale: 1.08,
                rotate: s.rotate
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.9, ease: "easeOut" }}
              style={{
                position: "absolute",
                left,
                top,
                width: s.size,
                height: s.size,
                borderRadius: 2,
                background: s.color,
                boxShadow: "0 0 8px rgba(255,255,255,.25)"
              }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
