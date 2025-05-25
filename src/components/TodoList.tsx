import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

type Task = {
  id: string;
  text: string;
  createdAt: string;
  dueDate: string;
};

const DraggableTask: React.FC<{
  task: Task;
  index: number;
  moveTask: (from: number, to: number) => void;
  onDelete: (id: string) => void;
}> = ({ task, index, moveTask, onDelete }) => {
  const dragDropRef = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { index, id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TASK",
    hover(item: { index: number }) {
      if (!dragDropRef.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      // Move task once
      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  useEffect(() => {
    if (dragDropRef.current) {
      drag(drop(dragDropRef.current));
    }
  }, [drag, drop]);
  return (
    <div
      ref={dragDropRef}
      className={`bg-white shadow rounded-md p-4 mb-3 border border-green-100 hover:bg-green-50 transition ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-lg font-medium text-green-700 mb-1">{task.text}</div>
          <div className="text-sm text-gray-500 flex gap-4">
            <span>{t("created")}: {task.createdAt}</span>
            <span>{t("due")}: {task.dueDate}</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 transition"
          aria-label={t("deleteTask")}
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

const DeleteBin: React.FC<{ onDropTask: (id: string) => void }> = ({ onDropTask }) => {
  const { t } = useTranslation();
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: string }) => {
      onDropTask(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const divRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (divRef.current) {
      drop(divRef.current);
    }
  }, [drop]);

  return (
    <div
      ref={divRef}
      className={`mt-6 flex items-center justify-center h-16 border-2 border-dashed rounded-md ${
        isOver ? "border-red-500 bg-red-50" : "border-gray-300"
      }`}
    >
      <span className="text-red-500 font-medium flex items-center gap-2">
        <MdDelete size={20} />
        {t("dragHereToDelete")}
      </span>
    </div>
  );
};

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [formError, setFormError] = useState("");
  const { t } = useTranslation();

  const isInitialized = React.useRef(false);
 
  useEffect(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isInitialized.current && tasks.length > 0) {
      isInitialized.current = true;
    }
    if (isInitialized.current) {
      localStorage.setItem("todoTasks", JSON.stringify(tasks));
    }
  }, [tasks]);
  
  const addTask = () => {
    if (taskInput.trim() === "") {
      setFormError(t("taskDescriptionIsRequired"));
      return;
    }
    if (dueDate === "") {
      setFormError(t("dueDateIsRequired"));
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      text: taskInput.trim(),
      createdAt: new Date().toLocaleDateString(),
      dueDate,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
    setDueDate("");
    setFormError(""); 
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const moveTask = (from: number, to: number) => {
    const updated = [...tasks];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setTasks(updated);
  };


  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6 mb-6 border border-green-100">
        <h3 className="text-xl font-semibold text-green-600 mb-4">{t("addANewTask")}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-green-700 mb-1" htmlFor="task-input">
              {t("task")}
            </label>
            <input
              id="task-input"
              type="text"
              value={taskInput}
              autoFocus
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder={t("egFinishProjectReport")}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1" htmlFor="due-date">
              {t("dueDate")}
            </label>
            <input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="flex flex-col justify-end sm:mt-6 h-full">
            <button
              onClick={addTask}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition"
              style={{ minWidth: 80 }}
            >
              {t("add")}
            </button>
          </div>
        </div>
         {formError && (
            <div className="text-red-500 text-sm font-medium">{formError}</div>
          )}
      </div>
      <div>
        <h3 className="text-lg font-medium text-green-600 mb-3">{t("yourToDoList")}</h3>
        <div className="bg-gray-50 p-4 rounded shadow border border-green-100 min-h-[200px]">
          {tasks.length === 0 ? (
            <p className="text-gray-400 italic">{t("noTasksYetAddOneAbove")}</p>
          ) : (
            tasks.map((task, index) => (
              <DraggableTask
                key={task.id}
                task={task}
                index={index}
                moveTask={moveTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>

      <DeleteBin onDropTask={deleteTask} />
      <Footer />
    </div>
  );
};

export default TodoList;
