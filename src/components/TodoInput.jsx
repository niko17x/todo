import React, { useContext, useState } from "react";
import { addTaskToFirestore } from "../utils/addTaskToFirestore";
import { DataContext } from "../App";
import {
  addHashToTags,
  displayWarningMessage,
  resetInputs,
} from "../utils/helpers";
import { updateCustomListTaskCount } from "../utils/updateCustomListTaskCount.js";

export const TodoInput = () => {
  const {
    activeUsername,
    activeUserId,
    isUrgent,
    setIsUrgent,
    selectedList,
    setListCounts,
  } = useContext(DataContext);
  const [inputIsEmpty, setInputIsEmpty] = useState(null);
  const [localTaskInput, setLocalTaskInput] = useState("");
  const [localTagInput, setLocalTagInput] = useState("");

  const handleAddTaskToFirestore = async (hashedTags) => {
    const todoData = {
      activeUsername,
      taskInput: localTaskInput,
      urgentFlag: isUrgent,
      activeUserId,
      tags: hashedTags,
      selectedList,
      list: selectedList,
    };
    try {
      const { generatedTaskId } = await addTaskToFirestore(todoData);
      // TODO: Optimize the 2 identical functions below to prevent any *race conditions*:
      addTaskToFirestore({
        ...todoData,
        selectedList: "all",
        id: generatedTaskId,
      });
      isUrgent &&
        (await addTaskToFirestore({
          ...todoData,
          selectedList: "urgent",
          id: generatedTaskId,
        }));
      updateCustomListTaskCount(setListCounts, selectedList, "add");
    } catch (error) {
      console.log(`Error: ${error} - Occurred @ handleAddTaskToFirestore.`);
    }
  };

  const handleTaskInput = async () => {
    if (!localTaskInput) {
      displayWarningMessage(setInputIsEmpty);
      return;
    }
    try {
      const hashedTags = addHashToTags(localTagInput);
      handleAddTaskToFirestore(hashedTags);
    } catch (error) {
      console.log(`Error ${error} - occurred @ handleTaskInput function.`);
    }
    resetInputs(setLocalTaskInput, setIsUrgent, setLocalTagInput);
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
          onChange={(e) => setLocalTaskInput(e.target.value)}
        />
        <div className="options">
          <input
            className="tags-input"
            type="text"
            placeholder="Add tags separated by a space."
            onChange={(e) => setLocalTagInput(e.target.value)}
          />
          <fieldset>
            <img className="urgent" src="../src/assets/icons/urgent.svg" />
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
          <img className="plus" src="../src/assets/icons/plus.svg" />
        </button>
      </form>
    </div>
  );
};
