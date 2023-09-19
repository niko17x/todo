import React from "react";

export const TodoInput = () => {
  return (
    <div className="todoInput">
      <form action="">
        <input type="text" placeholder="Have something to do?" />
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
              <input type="checkbox" name="checkbox" />
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
