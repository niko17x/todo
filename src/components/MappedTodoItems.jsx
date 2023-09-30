import { useContext, useEffect, useState } from "react";
import { fetchTodoCollection } from "../utils/fetchTodoCollection";
import { db } from "../lib/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { DataContext } from "../App";
import { updateFirestoreTodoFields } from "../utils/updateFirestoreTodoFields";

export const MappedTodoItems = () => {
  const {
    activeUserId,
    todoTasks,
    setTodoTasks,
    setTaskEditId,
    setShowTaskEditModal,
  } = useContext(DataContext);

  useEffect(() => {
    fetchTodoCollection(setTodoTasks, activeUserId);
  }, [setTodoTasks, activeUserId]);

  const deleteTask = async (task) => {
    await deleteDoc(doc(db, `todo/${task}`));
  };

  const updateTaskEditIdState = async (taskId) => {
    const docRef = doc(db, "todo", taskId);
    const docSnapshot = await getDoc(docRef);
    setTaskEditId(docSnapshot.data().taskId);
  };

  const handleTaskEditClick = (taskId) => {
    setShowTaskEditModal(true);
    updateTaskEditIdState(taskId);
  };

  const handleTaskCompletion = (task) => {
    // Immediately updated UI for experience:
    updateFirestoreTodoFields(task.taskId, {
      completed: !task.completed,
    });
    // Update the local state too for React re-rendering:
    setTodoTasks((prevTasks) => {
      return prevTasks.map((t) => {
        if (t.taskId === task.taskId) {
          return { ...t, completed: !t.completed };
        }
        return t;
      });
    });
  };

  return (
    <>
      {todoTasks.map((task) => (
        <div
          className={`${
            task.urgentFlag ? "mappedTodoItem urgent-glow" : "mappedTodoItem"
          } ${task.completed ? "completed" : ""}`}
          key={task.createdAt}
          onClick={() => handleTaskCompletion(task)}
        >
          <p>{task.taskInput}</p>
          <div className="options">
            <button
              type="button"
              onClick={() => {
                handleTaskEditClick(task.taskId);
              }}
            >
              <img src="../../src/assets/icons/edit.svg" alt="Edit" />
            </button>
            <button>
              <img
                src="../../src/assets/icons/trash.svg"
                alt="Delete"
                onClick={() => deleteTask(task.taskId)}
              />
            </button>
          </div>
          <div className="tags">{task.tags}</div>
        </div>
      ))}
    </>
  );
};
