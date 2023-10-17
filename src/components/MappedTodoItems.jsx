import { useContext, useEffect, useRef } from "react";
import { fetchTodoCollection } from "../utils/fetchTodoCollection";
import { db } from "../lib/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { DataContext } from "../App";
import { toggleTaskCompleteField } from "../utils/toggleTaskCompletedField";
import { moveTaskToCompleted } from "../utils/moveTaskToCompleted";
import { moveTaskToToday } from "../utils/moveTaskToToday";
import { moveTaskToUrgent } from "../utils/moveTaskToUrgent";
import { removeDeletedTasksFromAllLists } from "../utils/removeDeletedTasksFromAllLists";
import { updateCustomListTaskCount } from "../utils/updateCustomListTaskCount";

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
    setListCounts,
  } = useContext(DataContext);
  const unsubscribeRef = useRef(null);
  const listItems = ["today", ...customList];
  const everyListItem = [...defaultList, ...customList];

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
      await removeDeletedTasksFromAllLists(activeUserId, task, [everyListItem]);
      updateCustomListTaskCount(setListCounts, selectedList, "subtract");
    } catch (error) {
      console.log(`Error: ${error} - Occurred @ deleteTask`);
    }
  };

  const updateTaskEditId = async (task) => {
    const docRef = doc(db, `todo/${activeUserId}/${selectedList}/${task.id}`);
    const docSnapshot = await getDoc(docRef);
    setTaskEditId(docSnapshot.id);
  };

  const handleTaskEditClick = (task) => {
    setShowTaskEditModal(true);
    updateTaskEditId(task);
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
        await moveTaskToCompleted(activeUserId, task, everyListItem);
        // ! What is this?
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

  return (
    <div className="mappedTodoItems">
      <h2 className="list-title">{selectedList}</h2>
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
                  task.urgentFlag ? "tasks urgent-glow" : "tasks"
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
                      handleTaskEditClick(task);
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
    </div>
  );
};
