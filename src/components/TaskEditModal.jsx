import React, { useContext, useState } from "react";
import { toggleTaskCompleteField } from "../utils/toggleTaskCompletedField";
import { ListContext, ModalContext, TaskContext, UserContext } from "../App";
import { editTaskOnFirestore } from "../utils/editTaskAtFirestore";
import { addHashToTags, resetInputs } from "../utils/helpers";
import { moveTaskToUrgent } from "../utils/moveTaskToUrgent";

export const TaskEditModal = () => {
  const { taskEditId, todoTasks } = useContext(TaskContext);
  const { setShowTaskEditModal, showTaskEditModal } = useContext(ModalContext);
  const { selectedList } = useContext(ListContext);
  const { activeUserId } = useContext(UserContext);
  const [localTaskInput, setLocalTaskInput] = useState("");
  const [localTagsInput, setLocalTagsInput] = useState("");
  const [localUrgentInput, setLocalUrgentInput] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasInteractedWithTags, setHasInteractedWithTags] = useState(false);
  const [hasInteractedWithUrgent, setHasInteractedWithUrgent] = useState(false);

  const handleTaskEditInput = (task, e) => {
    e.preventDefault();
    try {
      const data = {};
      if (localTaskInput) {
        data.taskInput = localTaskInput;
      }
      if (localTagsInput) {
        data.tags = addHashToTags(localTagsInput);
      }
      if (localTaskInput && localTagsInput) {
        editTaskOnFirestore(
          localTaskInput,
          localUrgentInput,
          task.id,
          localTagsInput,
          selectedList,
          activeUserId
        );
        // localUrgentInput && moveTaskToUrgent(activeUserId, task)
      } else {
        toggleTaskCompleteField(activeUserId, selectedList, task.id, data, {
          ...data,
          urgentFlag: localUrgentInput,
        });
      }
      setShowTaskEditModal(false);
      resetInputs(setLocalTaskInput, setLocalUrgentInput, setLocalTagsInput);
    } catch (error) {
      console.log(`Error: ${error} - Occurred @ handleTaskEditInput function.`);
    }
  };

  const handleTaskInputChange = (e) => {
    setLocalTaskInput(e.target.value);
    setHasInteracted(true);
  };

  const handleTagsInputChange = (e) => {
    setLocalTagsInput(e.target.value);
    setHasInteractedWithTags(true);
  };

  const handleUrgentInputChange = (e) => {
    setLocalUrgentInput(e.target.checked);
    setHasInteractedWithUrgent((prev) => !prev);
  };

  return (
    <div className={showTaskEditModal ? "overlay" : ""}>
      <div className="taskEditModal modal">
        {todoTasks.map((task) => {
          if (task.id === taskEditId) {
            return (
              <div className="show" key={task.id}>
                <button
                  className="close"
                  type="button"
                  onClick={() => {
                    setShowTaskEditModal(false);
                    resetInputs(
                      setLocalTaskInput,
                      setLocalUrgentInput,
                      setLocalTagsInput
                    );
                  }}
                >
                  X
                </button>
                <form
                  id="modal"
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTaskEditInput(task, e);
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
                          value={
                            hasInteractedWithTags ? localTagsInput : task.tags
                          }
                          onChange={handleTagsInputChange}
                        ></input>
                      </label>
                      <div className="urgent">
                        <img
                          className="img-urgent"
                          src="../src/assets/icons/urgent.svg"
                          alt="hourglass"
                        />
                        <label htmlFor="checkbox">
                          <input
                            className="input-checkbox"
                            type="checkbox"
                            name="checkbox"
                            // checked={task.urgentFlag}
                            checked={
                              hasInteractedWithUrgent
                                ? localUrgentInput
                                : task.urgentFlag
                            }
                            onChange={handleUrgentInputChange}
                          />
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  <button className="submit" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
