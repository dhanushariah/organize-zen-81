
import { useState, useEffect, RefObject } from "react";

interface DragDropProps {
  columnId: string;
  columnRef: RefObject<HTMLDivElement>;
  onMoveTask?: (taskId: string, sourceColumn: string, targetColumn: string) => void;
  draggedTask: string | null;
  setDraggedTask: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useDragDrop({
  columnId,
  columnRef,
  onMoveTask,
  draggedTask,
  setDraggedTask
}: DragDropProps) {
  // Handle drag and drop functionality
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (columnRef.current) {
        columnRef.current.classList.add('task-drop-target');
      }
    };

    const handleDragLeave = () => {
      if (columnRef.current) {
        columnRef.current.classList.remove('task-drop-target');
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (columnRef.current) {
        columnRef.current.classList.remove('task-drop-target');
      }

      const taskId = e.dataTransfer?.getData('text/plain');
      const sourceColumn = e.dataTransfer?.getData('source-column');
      
      if (taskId && sourceColumn && sourceColumn !== columnId && onMoveTask) {
        console.log(`Dropping task ${taskId} from ${sourceColumn} to ${columnId}`);
        onMoveTask(taskId, sourceColumn, columnId);
      }
    };

    const column = columnRef.current;
    if (column) {
      column.addEventListener('dragover', handleDragOver);
      column.addEventListener('dragleave', handleDragLeave);
      column.addEventListener('drop', handleDrop);

      return () => {
        column.removeEventListener('dragover', handleDragOver);
        column.removeEventListener('dragleave', handleDragLeave);
        column.removeEventListener('drop', handleDrop);
      };
    }
  }, [columnId, onMoveTask, columnRef]);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.setData('source-column', columnId);
    setDraggedTask(taskId);
    
    setTimeout(() => {
      const taskElement = document.getElementById(`task-${taskId}`);
      if (taskElement) {
        taskElement.classList.add('task-dragging');
      }
    }, 0);
  };

  // Handle drag end
  const handleDragEnd = (taskId: string) => {
    setDraggedTask(null);
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
      taskElement.classList.remove('task-dragging');
    }
  };

  // Handle direct column move
  const handleMoveTaskToColumn = (taskId: string, targetColumnId: string) => {
    if (onMoveTask) {
      console.log(`Moving task ${taskId} from ${columnId} to ${targetColumnId}`);
      onMoveTask(taskId, columnId, targetColumnId);
    }
  };

  return {
    handleDragStart,
    handleDragEnd,
    handleMoveTaskToColumn
  };
}
