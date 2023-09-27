import React, { useContext, useState } from "react";
import { addTodoToFirestore } from "../utils/addTaskToFirestore";
import { DataContext } from "../App";
import {
  addHashToTags,
  displayWarningMessage,
  resetInputs,
} from "../utils/helpers";

export const TodoInput = () => {
  const {
    activeUsername,
    activeUserId,
    setTaskInput,
    taskInput,
    isUrgent,
    setIsUrgent,
    tags,
    setTags,
  } = useContext(DataContext);
  const [inputIsEmpty, setInputIsEmpty] = useState(null);

  const handleTaskInput = () => {
    !taskInput ? displayWarningMessage(setInputIsEmpty) : null;
    try {
      const hashedTags = addHashToTags(tags);
      addTodoToFirestore({
        activeUsername: activeUsername,
        taskInput: taskInput,
        urgentFlag: isUrgent,
        activeUserId: activeUserId,
        tags: hashedTags,
      });
    } catch (error) {
      console.log(`Error ${error} - occurred @ handleTaskInput function.`);
    }
    resetInputs(setTaskInput, setIsUrgent, setTags);
  };

  const handleUrgentInput = (e) => {
    setIsUrgent(e.target.checked);
  };

  return (
    <div className="todoInput">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          e.target.reset();
          handleTaskInput();
        }}
      >
        <input
          className={inputIsEmpty ? "warning" : null}
          type="text"
          placeholder={
            inputIsEmpty
              ? "This field can not be empty."
              : "What do you need to do?"
          }
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <div className="options">
          <input
            className="tags-input"
            type="text"
            placeholder="Add tags separated by a space."
            onChange={(e) => setTags(e.target.value)}
          />
          <fieldset>
            <img src="../src/assets/icons/exclamation.svg" />
            <label className="form-control" htmlFor="checkbox">
              <input
                type="checkbox"
                name="checkbox"
                checked={isUrgent}
                onChange={handleUrgentInput}
              />
            </label>
          </fieldset>
        </div>
        <button type="submit">
          <img src="../src/assets/icons/plus.svg" />
        </button>
      </form>
    </div>
  );
};
