import { DndContext, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import KanbanColumn from '../KanbanColumn';
import './KanbanBoard.css';

const KanbanBoard = ({ columns, tasks, setTasks, handleAddTask, handleDeleteTask, handleUpdateTask }) => {
  const getTasksByColumn = (columnId) => {
    return tasks.filter(task => task.columnId === columnId).sort((a, b) => a.index - b.index);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find(t => t.id === activeId);
    const overTask = tasks.find(t => t.id === overId);
    const overColumn = columns.find(c => c.id === overId);

    const activeColumnId = activeTask.columnId;
    const overColumnId = overTask ? overTask.columnId : overColumn?.id;

    if (!overColumnId) return;

    if (activeColumnId === overColumnId) {
      setTasks(currentTasks => {
        const activeIndex = currentTasks.findIndex(t => t.id === activeId);
        const overIndex = currentTasks.findIndex(t => t.id === overId);
        return arrayMove(currentTasks, activeIndex, overIndex);
      });
    } else {
      setTasks(currentTasks => {
        return currentTasks.map(t => {
          if (t.id === activeId) {
            return { ...t, columnId: overColumnId };
          }
          return t;
        });
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={getTasksByColumn(column.id)}
            handleAddTask={handleAddTask}
            handleDeleteTask={handleDeleteTask}
            handleUpdateTask={handleUpdateTask}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;

