import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { editTaskOnFirestore } from "../utils/editTaskAtFirestore";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  addHashToTags,
  displayWarningMessage,
  resetInputs,
} from "../utils/helpers";

export const TaskEditModal = () => {
  const { taskEditId, todoTasks, setShowTaskEditModal, isUrgent, setIsUrgent } =
    useContext(DataContext);
  const [editsMade, setEditsMade] = useState(null);
  const [localTaskInput, setLocalTaskInput] = useState("");
  const [localTags, setLocalTags] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasInteractedWithTags, setHasInteractedWithTags] = useState(false);

  useEffect(() => {
    addHashToTags(localTags);
  }, [localTags]);

  const handleUrgentInput = (e) => {
    setIsUrgent(e.target.checked);
  };

  const updatedFirestore = async (taskId, data) => {
    try {
      const docRef = doc(db, `todo/${taskId}`);
      await updateDoc(docRef, {
        updatedAt: serverTimestamp(),
        ...data,
      });
    } catch (error) {
      console.log(`Error ${error} - Occurred @ updatedFirestore function.`);
    }
  };

  const handleTaskEditInput = (taskId, e) => {
    e.preventDefault();
    if (!localTaskInput && !localTags) {
      displayWarningMessage(setEditsMade);
      return;
    }
    try {
      const data = {};
      if (localTaskInput) {
        data.taskInput = localTaskInput;
      }
      if (localTags) {
        data.tags = addHashToTags(localTags);
      }
      if (isUrgent) {
        data.urgentFlag = isUrgent;
      }
      if (localTaskInput && localTags) {
        editTaskOnFirestore(localTaskInput, isUrgent, taskId, localTags);
      } else {
        updatedFirestore(taskId, data);
      }
      setShowTaskEditModal(false);
      resetInputs(setLocalTaskInput, setIsUrgent, setLocalTags);
    } catch (error) {
      console.log(`Error: ${error} - Occurred @ handleTaskEditInput function.`);
    }
  };

  const handleTaskInputChange = (e) => {
    setLocalTaskInput(e.target.value);
    setHasInteracted(true);
  };

  const handleTagsInputChange = (e) => {
    setLocalTags(e.target.value);
    setHasInteractedWithTags(true);
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
                onClick={() => {
                  setShowTaskEditModal(false);
                  resetInputs(setLocalTaskInput, setIsUrgent, setLocalTags);
                }}
              >
                X
              </button>
              <form
                id="modal"
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTaskEditInput(task.taskId, e);
                }}
              >
                <fieldset>
                  <label htmlFor="input">
                    <input
                      className="input-task"
                      type="text"
                      name="task"
                      value={hasInteracted ? localTaskInput : task.taskInput}
                      onChange={handleTaskInputChange}
                    ></input>
                  </label>
                  <div className="options">
                    <label htmlFor="tags">
                      <input
                        className="input-tags"
                        type="text"
                        name="tags"
                        value={hasInteractedWithTags ? localTags : task.tags}
                        onChange={handleTagsInputChange}
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
