import { useContext, useEffect } from "react";
import { fetchTodoCollection } from "../utils/fetchTodoCollection";
import { db } from "../lib/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { DataContext } from "../App";

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

  // create useEffect to go through FS tags and add hash before every element:
  useEffect(() => {});

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

  return (
    <>
      {todoTasks.map((task) => (
        <div
          className={
            task.urgentFlag ? "mappedTodoItem urgent-glow" : "mappedTodoItem"
          }
          key={task.createdAt}
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
