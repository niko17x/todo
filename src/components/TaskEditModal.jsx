import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import { editTaskOnFirestore } from "../utils/editTaskAtFirestore";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { addHashToTags, resetInputs } from "../utils/helpers";

export const TaskEditModal = () => {
  const {
    taskEditId,
    todoTasks,
    setShowTaskEditModal,
    setTaskInput,
    isUrgent,
    setIsUrgent,
    taskInput,
    tags,
    setTags,
  } = useContext(DataContext);
  const [editsMade, setEditsMade] = useState(null);

  const handleUrgentInput = (e) => {
    setIsUrgent(e.target.checked);
  };

  const updateTags = async (taskId) => {
    const hashedTags = addHashToTags(tags);
    const docRef = doc(db, `todo/${taskId}`);
    await updateDoc(docRef, {
      tags: hashedTags,
      updatedAt: serverTimestamp(),
    });
  };

  const handleTaskEditInput = (taskId) => {
    if (!taskInput && !tags) {
      setTimeout(() => {
        setEditsMade(false);
      }, 2000);
      setEditsMade(true);
      return;
    }
    try {
      editTaskOnFirestore(taskInput, isUrgent, taskEditId);
      setShowTaskEditModal(false);
      updateTags(taskId);
    } catch (error) {
      console.log(`Error ${error} - occurred @ handleTaskEditInput function.`);
    }
    resetInputs(setTaskInput, setIsUrgent, setTags);
  };

  return (
    <div className="taskEditModal">
      {todoTasks.map((task) => {
        if (task.taskId === taskEditId) {
          return (
            <div className="show" key={task.taskId}>
              <button
                className="close"
                type="button"
                onClick={() => setShowTaskEditModal(false)}
              >
                X
              </button>
              <form
                id="modal"
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTaskEditInput(task.taskId);
                }}
              >
                <fieldset>
                  <label htmlFor="input">
                    <input
                      className="input-task"
                      type="text"
                      name="task"
                      placeholder={task.taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                    ></input>
                  </label>
                  <div className="options">
                    <label htmlFor="tags">
                      <input
                        className="input-tags"
                        type="text"
                        name="tags"
                        placeholder={task.tags.length ? task.tags : "Tags #"}
                        onChange={(e) => setTags(e.target.value)}
                      ></input>
                    </label>
                    <div className="urgent">
                      <img
                        className="img-urgent"
                        src="../src/assets/icons/exclamation.svg"
                        alt="hourglass"
                      />
                      <label htmlFor="checkbox">
                        <input
                          className="input-checkbox"
                          type="checkbox"
                          name="checkbox"
                          checked={isUrgent}
                          onChange={handleUrgentInput}
                        />
                      </label>
                    </div>
                  </div>
                </fieldset>
                <button className="btn-submit" type="submit">
                  Submit
                </button>
                {!editsMade ? null : (
                  <div style={{ color: "red" }}>No edits made.</div>
                )}
              </form>
            </div>
          );
        }
      })}
    </div>
  );
};
