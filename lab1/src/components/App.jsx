// src/components/App.jsx
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, Reorder, motion, useReducedMotion } from "framer-motion";
import { AssignmentsProvider, useAssignments } from "../context/AssignmentsContext";
import { STATUS, PRIORITIES } from "../utils/constants";
import { formatDate } from "../utils/formatDate";
import WowBackground from "./WowBackground";
import ParticlesBurst from "./ParticlesBurst";
import Sparkles from "./Sparkles";
import DragTrashZone from "./DragTrashZone";

function AppShell() {
  const prefersReduced = useReducedMotion();
  const spring = prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 30 };

  const { assignments, add, remove, cycleStatus, reorderByIds } = useAssignments();

  // UI state
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [shake, setShake] = useState(false);

  // WOW states
  const [burstAddKey, setBurstAddKey] = useState(0);       // nổ khi thêm
  const [burstDrop, setBurstDrop] = useState({ key: 0, x: 0, y: 0 }); // nổ khi thả vào thùng
  const [reorderMode, setReorderMode] = useState(true);    // bật kéo-thả
  const [dragging, setDragging] = useState(false);

  // refs để tính toạ độ nổ & vùng thùng rác
  const containerRef = useRef(null);
  const trashRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 360);
      return;
    }
    add({ title, course, dueDate, priority });
    setTitle(""); setCourse(""); setDueDate(""); setPriority("medium");
    setBurstAddKey(k => k + 1);
  };

  // Lọc + search
  const baseFiltered = useMemo(() => {
    let list = assignments;
    if (filter !== "all") list = list.filter(a => a.status === filter);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter(a =>
      a.title.toLowerCase().includes(q) || a.course.toLowerCase().includes(q)
    );
    return list;
  }, [assignments, filter, query]);

  // Danh sách hiển thị
  const autoSorted = useMemo(() => {
    const weight = { [STATUS.TODO]: 0, [STATUS.IN_PROGRESS]: 1, [STATUS.DONE]: 2 };
    return [...baseFiltered].sort((a, b) => {
      const sw = weight[a.status] - weight[b.status];
      if (sw !== 0) return sw;
      const ad = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const bd = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      if (ad !== bd) return ad - bd;
      return b.createdAt - a.createdAt;
    });
  }, [baseFiltered]);

  const manualSorted = useMemo(
    () => [...baseFiltered].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [baseFiltered]
  );

  const list = reorderMode ? manualSorted : autoSorted;

  // Handle thả item: nếu thả trong vùng trash -> xoá & nổ tại toạ độ
  const handleDragEnd = (item, info) => {
    setDragging(false);
    const trashEl = trashRef.current;
    const contEl = containerRef.current;
    if (!trashEl || !contEl) return;

    const rect = trashEl.getBoundingClientRect();
    const pt = info.point; // {x,y} theo viewport
    const inside = pt.x >= rect.left && pt.x <= rect.right && pt.y >= rect.top && pt.y <= rect.bottom;

    if (inside) {
      const contRect = contEl.getBoundingClientRect();
      setBurstDrop({
        key: Date.now(),
        x: pt.x - contRect.left,
        y: pt.y - contRect.top
      });
      remove(item.id);
    }
  };

  // Filter tabs (indicator trượt)
  const filters = [
    { key: "all", label: "Tất cả" },
    { key: STATUS.TODO, label: "Chưa làm" },
    { key: STATUS.IN_PROGRESS, label: "Đang làm" },
    { key: STATUS.DONE, label: "Hoàn thành" },
  ];

  return (
    <div ref={containerRef} className="app" style={{ position: "relative", zIndex: 1 }}>
      <WowBackground />

      {/* Pháo giấy khi thêm + khi thả vào trash */}
      <ParticlesBurst fireKey={burstAddKey} />
      <ParticlesBurst fireKey={burstDrop.key} x={burstDrop.x} y={burstDrop.y} />

      <header className="header" style={{ position: "relative", zIndex: 2 }}>
        <motion.h1
          className="title"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.05 }}
          style={{
            background: "linear-gradient(90deg,#e2e8f0,#93c5fd,#e2e8f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 100%",
            animation: prefersReduced ? "none" : "shimmer 8s linear infinite"
          }}
        >
          Student Assignment Tracker
        </motion.h1>
        <motion.p className="subtitle" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...spring, delay: 0.15 }}>
          Kéo-thả sắp xếp, rung khi lỗi và “nổ đùng” khi thêm/xoá ✨
        </motion.p>
      </header>

      {/* Form thêm */}
      <motion.form
        layout
        onSubmit={onSubmit}
        className="form"
        animate={shake ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.35 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <input className="input" placeholder="Tiêu đề bài tập" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="input" placeholder="Môn học / lớp" value={course} onChange={e => setCourse(e.target.value)} />
        <input className="input" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <select className="select" value={priority} onChange={e => setPriority(e.target.value)}>
          {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <motion.button whileTap={{ scale: 0.96 }} className="btn" type="submit">Thêm</motion.button>
      </motion.form>

      {/* Công cụ */}
      <div className="toolbar">
        <div className="filters" style={{ position: "relative" }}>
          {filters.map(f => (
            <motion.button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`chip ${filter === f.key ? "active" : ""}`}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {filter === f.key && <motion.span layoutId="chipIndicator" className="chip-indicator" transition={spring} />}
              <span style={{ position: "relative", zIndex: 1 }}>{f.label}</span>
            </motion.button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input className="search" placeholder="Tìm theo tiêu đề / môn..." value={query} onChange={e => setQuery(e.target.value)} />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="btn-outline"
            onClick={() => setReorderMode(v => !v)}
            title="Bật/tắt kéo-thả sắp xếp"
          >
            {reorderMode ? "Kéo-thả: ON" : "Kéo-thả: OFF"}
          </motion.button>
        </div>
      </div>

      {/* Danh sách: auto (motion.ul) hoặc manual (Reorder.Group) */}
      {reorderMode ? (
        <Reorder.Group
          axis="y"
          values={list}
          onReorder={(newItems) => reorderByIds(newItems.map(x => x.id))}
          className="list"
        >
          {list.map(a => (
            <Reorder.Item
              key={a.id}
              value={a}
              className={`card priority-${a.priority}`}
              onDragStart={() => setDragging(true)}
              onDragEnd={(e, info) => handleDragEnd(a, info)}
              whileDrag={{ scale: 1.02, rotate: 0.4, zIndex: 5, boxShadow: "0 8px 24px rgba(0,0,0,.35)" }}
              dragElastic={0.2}
              transition={spring}
            >
              <ItemContent a={a} cycleStatus={cycleStatus} remove={remove} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        <motion.ul className="list" layout>
          <AnimatePresence initial={false}>
            {list.map(a => (
              <motion.li
                key={a.id}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={spring}
                className={`card priority-${a.priority}`}
              >
                <ItemContent a={a} cycleStatus={cycleStatus} remove={remove} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {/* Empty state */}
      {list.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="empty">
          Chưa có bài tập nào phù hợp bộ lọc. Thêm bài mới ở trên nhé!
        </motion.div>
      )}

      {/* Thùng rác (hiển thị khi kéo-thả) */}
      <DragTrashZone ref={trashRef} active={reorderMode && dragging} />

      <footer className="footer">
        <span>
          Tổng: <b>{assignments.length}</b> — Chưa làm: <b>{assignments.filter(x => x.status === STATUS.TODO).length}</b> — Hoàn thành: <b>{assignments.filter(x => x.status === STATUS.DONE).length}</b>
        </span>
      </footer>
    </div>
  );
}

function ItemContent({ a, cycleStatus, remove }) {
  return (
    <div className="card-tilt" style={{ transformStyle: "preserve-3d", perspective: 800, position: "relative" }}>
      <Sparkles active={a.status === STATUS.DONE} />
      <div className="card-main">
        <div className="card-title">{a.title}</div>
        <div className="card-meta">
          {a.course && <span className="meta">{a.course}</span>}
          {a.dueDate && <span className="meta">Due: {formatDate(a.dueDate)}</span>}
          <span className={`status ${a.status}`}>{a.status}</span>
        </div>
      </div>
      <div className="card-actions">
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} className="btn-outline" onClick={() => cycleStatus(a.id)}>
          Next status
        </motion.button>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} className="btn-danger" onClick={() => remove(a.id)}>
          Xoá
        </motion.button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AssignmentsProvider>
      <AppShell />
    </AssignmentsProvider>
  );
}
