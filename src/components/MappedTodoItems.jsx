import { useContext, useEffect } from "react";
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
    selectedList,
  } = useContext(DataContext);

  useEffect(() => {
    fetchTodoCollection(setTodoTasks, activeUserId, selectedList);
  }, [setTodoTasks, activeUserId, selectedList]);

  const deleteTask = async (task) => {
    await deleteDoc(doc(db, `todo/${activeUserId}/today/${task}`));
  };

  const updateTaskEditIdState = async (taskId) => {
    const docRef = doc(db, `todo/${activeUserId}/today/${taskId}`);
    const docSnapshot = await getDoc(docRef);
    setTaskEditId(docSnapshot.data().taskId);
  };

  const handleTaskEditClick = (taskId) => {
    setShowTaskEditModal(true);
    updateTaskEditIdState(taskId);
  };

  const handleTaskCompletion = (task) => {
    // Immediately updated UI for experience:
    updateFirestoreTodoFields(activeUserId, selectedList, task.taskId, {
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
      {todoTasks
        .filter((task) => task.showDoc)
        .map((task) => (
          <div
            className={`${
              task.urgentFlag ? "mappedTodoItem urgent-glow" : "mappedTodoItem"
            } ${task.completed ? "completed" : ""}`}
            key={task.createdAt}
          >
            <div onClick={() => handleTaskCompletion(task)}>
              <p>{task.taskInput}</p>
              <div className="tags">{task.tags}</div>
            </div>
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
          </div>
        ))}
    </>
  );
};
