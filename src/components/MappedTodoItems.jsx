import { useContext, useEffect, useRef, useState } from "react";
import { fetchTodoCollection } from "../utils/fetchTodoCollection";
import { db } from "../lib/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { DataContext } from "../App";
import { toggleTaskCompleteField } from "../utils/toggleTaskCompletedField";
import { moveTaskToCompleted } from "../utils/moveTaskToCompleted";
import { moveTaskToToday } from "../utils/moveTaskToToday";

export const MappedTodoItems = () => {
  const {
    activeUserId,
    todoTasks,
    setTodoTasks,
    setTaskEditId,
    setShowTaskEditModal,
    selectedList,
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

  const updateTodoTasksState = (task) => {
    setTodoTasks((prevTasks) => {
      return prevTasks.map((t) => {
        if (t.taskId === task.taskId) {
          return { ...t, completed: !task.completed };
        }
        return t;
      });
    });
  };

  const handleTaskCompletion = async (task) => {
    const taskToggledStatus = !task.completed;
    try {
      updateTodoTasksState(task);
      await toggleTaskCompleteField(activeUserId, selectedList, task);

      // if (taskToggledStatus) {
      //   moveTaskToCompleted(activeUserId, task);
      // }
      if (!taskToggledStatus) {
        await moveTaskToToday(activeUserId, task);
      }
    } catch (error) {
      console.log(`Error: ${error} - handleTaskCompletion`);
      // Revert optimistic UI update in case of error.
      setTodoTasks((prevTasks) => {
        return prevTasks.map((t) => {
          if (t.taskId === task.taskId) {
            return { ...t, completed: task.completed };
          }
          return t;
        });
      });
    }
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
    </>
  );
};
