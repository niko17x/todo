import React, { useContext } from "react";
import { DataContext } from "../App";
import { editTaskOnFirestore } from "../utils/editTaskAtFirestore";

export const TaskEditModal = () => {
  const {
    taskEditId,
    todoTasks,
    setShowTaskEditModal,
    setTaskInput,
    isUrgent,
    setIsUrgent,
    taskInput,
  } = useContext(DataContext);

  const handleUrgentInput = (e) => {
    setIsUrgent(e.target.checked);
  };

  const handleTaskEditInput = () => {
    editTaskOnFirestore(taskInput, isUrgent, taskEditId);
    setShowTaskEditModal(false);
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
                  handleTaskEditInput();
                }}
              >
                <fieldset>
                  <label htmlFor="input">
                    <input
                      className="input-task"
                      type="text"
                      name="input"
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
              </form>
            </div>
          );
        }
      })}
    </div>
  );
};
