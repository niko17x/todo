import { useContext, useEffect, useRef } from "react";
import { fetchTodoCollection } from "../utils/fetchTodoCollection";
import { db } from "../lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { DataContext } from "../App";
import { toggleTaskCompleteField } from "../utils/toggleTaskCompletedField";
import { moveTaskToCompleted } from "../utils/moveTaskToCompleted";
import { moveTaskToToday } from "../utils/moveTaskToToday";
import { moveTaskToUrgent } from "../utils/moveTaskToUrgent";
import { removeDeletedTasksFromAllLists } from "../utils/removeDeletedTasksFromAllLists";

export const MappedTodoItems = () => {
  const {
    activeUserId,
    todoTasks,
    setTodoTasks,
    setTaskEditId,
    setShowTaskEditModal,
    selectedList,
    defaultList,
    customList,
  } = useContext(DataContext);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    // Ensure that there is only 1 active listener:
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    unsubscribeRef.current = fetchTodoCollection(
      setTodoTasks,
      activeUserId,
      selectedList
    );
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [setTodoTasks, activeUserId, selectedList]);

  const deleteTask = async (task) => {
    try {
      await deleteDoc(
        doc(db, `todo/${activeUserId}/${selectedList}/${task.id}`)
      );
      await removeDeletedTasksFromAllLists(activeUserId, task, [
        ...defaultList,
        ...customList,
      ]);
    } catch (error) {
      console.log(`Error: ${error} - Occurred @ deleteTask`);
    }
  };

  const updateTaskEditIdState = async (taskId) => {
    const docRef = doc(db, `todo/${activeUserId}/${selectedList}/${taskId}`);
    const docSnapshot = await getDoc(docRef);
    setTaskEditId(docSnapshot.data().taskId);
  };

  const handleTaskEditClick = (taskId) => {
    setShowTaskEditModal(true);
    updateTaskEditIdState(taskId);
  };

  const updateTodoTasksState = (task, completeStatus) => {
    setTodoTasks((prevTasks) => {
      return prevTasks.map((t) => {
        if (t.taskId === task.taskId) {
          return { ...t, completed: completeStatus };
        }
        return t;
      });
    });
  };

  const handleTaskCompletion = async (task) => {
    const taskToggledStatus = !task.completed;
    try {
      updateTodoTasksState(task, !task.complete);
      await toggleTaskCompleteField(activeUserId, selectedList, task);
      if (taskToggledStatus) {
        await moveTaskToCompleted(activeUserId, task);
        await deleteDoc(doc(db, `todo/${activeUserId}/urgent/${task.id}`));
      } else {
        await moveTaskToToday(activeUserId, task);
        await moveTaskToUrgent(activeUserId, task);
      }
    } catch (error) {
      console.log(`Error: ${error} - handleTaskCompletion`);
      // Revert optimistic UI update in case of error.
      updateTodoTasksState(task, task.complete);
    }
  };

  const listItems = ["today", ...customList];

  // query all list by order of task list:
  const foo = async () => {
    if (!activeUserId) {
      return;
    }
    const queryCollRef = query(
      collection(db, `todo/${activeUserId}/all`),
      orderBy("list", "desc")
    );
    const querySnapshot = await getDocs(queryCollRef);

    querySnapshot.forEach((doc) => {
      const docRef = doc.data().list;
      console.log(docRef);
    });
  };

  return (
    <>
      {listItems.map((listName) => {
        const tasksForList = todoTasks.filter(
          (task) => task.showDoc && task.list === listName
        );

        if (tasksForList.length === 0) {
          return null;
        }

        return (
          <div key={listName}>
            {selectedList === "all" && (
              <h3 className="sub-heading">{listName}</h3>
            )}{" "}
            {tasksForList.map((task) => (
              <div
                className={`${
                  task.urgentFlag
                    ? "mappedTodoItem urgent-glow"
                    : "mappedTodoItem"
                } ${task.completed ? "completed" : ""}`}
                key={task.id}
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
                      onClick={() => deleteTask(task)}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};
