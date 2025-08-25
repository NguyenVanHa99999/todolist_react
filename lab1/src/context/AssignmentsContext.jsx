// src/context/AssignmentsContext.jsx
import { createContext, useContext, useMemo } from "react";
import { nanoid } from "nanoid";
import useLocalStorage from "../hooks/useLocalStorage";
import { STATUS } from "../utils/constants";

const AssignmentsContext = createContext(null);

/** Mỗi assignment: { id, title, course, dueDate, priority, status, createdAt, order } */
export function AssignmentsProvider({ children }) {
  const [assignments, setAssignments] = useLocalStorage("assignments_v1", []);

  const actions = useMemo(() => {
    const add = ({ title, course, dueDate, priority }) => {
      const t = (title || "").trim();
      if (!t) return;
      setAssignments(prev => {
        const minOrder = prev.length ? Math.min(...prev.map(a => a.order ?? 0)) : 0;
        const item = {
          id: nanoid(),
          title: t,
          course: (course || "").trim(),
          dueDate: dueDate || "",
          priority: priority || "medium",
          status: STATUS.TODO,
          createdAt: Date.now(),
          order: minOrder - 1, // thêm lên đầu khi sort theo order
        };
        return [item, ...prev];
      });
    };

    const remove = (id) => setAssignments(prev => prev.filter(a => a.id !== id));

    const cycleStatus = (id) => {
      const order = [STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE];
      setAssignments(prev =>
        prev.map(a =>
          a.id === id ? { ...a, status: order[(order.indexOf(a.status) + 1) % order.length] } : a
        )
      );
    };

    /** Nhận danh sách id theo thứ tự mới, cập nhật field order */
    const reorderByIds = (ids) => {
      const indexOf = new Map(ids.map((id, idx) => [id, idx]));
      setAssignments(prev =>
        prev.map(a => (indexOf.has(a.id) ? { ...a, order: indexOf.get(a.id) } : a))
      );
    };

    const update = (id, patch) =>
      setAssignments(prev => prev.map(a => (a.id === id ? { ...a, ...patch } : a)));

    const clearAll = () => setAssignments([]);

    return { add, remove, cycleStatus, reorderByIds, update, clearAll };
  }, [setAssignments]);

  const value = useMemo(() => ({ assignments, ...actions }), [assignments, actions]);
  return <AssignmentsContext.Provider value={value}>{children}</AssignmentsContext.Provider>;
}

export function useAssignments() {
  const ctx = useContext(AssignmentsContext);
  if (!ctx) throw new Error("useAssignments must be used within <AssignmentsProvider>");
  return ctx;
}
