import { useContext, useEffect, useState } from "react";
import { fetchTodoCollection } from "../utils/fetchTodoCollection";
import { db } from "../lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { DataContext } from "../App";

export const MappedTodoItems = () => {
  const { activeUserId } = useContext(DataContext);
  const [todoTasks, setTodoTasks] = useState([]);

  useEffect(() => {
    fetchTodoCollection(setTodoTasks, activeUserId);
  }, [activeUserId]);

  const deleteTask = async (task) => {
    await deleteDoc(doc(db, `todo/${task}`));
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
            <button type="button">
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
