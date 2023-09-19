import React from "react";

export const TodoItem = () => {
  return (
    <div className="todoItem">
      <input type="text" placeholder="Feed the puppies" />
      <div className="options">
        <button>
          <img src="../../src/assets/icons/edit.svg" />
        </button>
        <button>
          <img src="../../src/assets/icons/trash.svg" />
        </button>
      </div>
    </div>
  );
};
