import React, { useContext, useState } from "react";
import { addTodoToFirestore } from "../utils/addTodoToFirestore";
import { DataContext } from "../App";

export const TodoInput = () => {
  const { activeUsername, activeUserId } = useContext(DataContext);
  const [taskInput, setTaskInput] = useState("");
  const [inputIsEmpty, setInputIsEmpty] = useState(null);
  const [isUrgent, setIsUrgent] = useState(false);

  const handleTaskInput = () => {
    if (!taskInput) {
      setTimeout(() => {
        setInputIsEmpty(false);
      }, 1800);
      setInputIsEmpty(true);
    } else {
      addTodoToFirestore(activeUsername, taskInput, isUrgent, activeUserId);
      setTaskInput("");
    }
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
            placeholder="Tags: #birthday, #holiday, #travel"
          />
          <fieldset>
            <img
              className="exclamation"
              src="../src/assets/icons/exclamation.svg"
            />
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
