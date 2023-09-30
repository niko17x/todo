import React, { useState } from "react";

export const Sidebar = () => {
  const [customCategories, setCustomCategories] = useState([
    "coding",
    "health",
    "groceries",
  ]);

  const defaultCategories = () => {
    return (
      <ul className="defaultCategories">
        <li>Today</li>
        <li>All</li>
        <li>Urgent</li>
        <li>Completed</li>
      </ul>
    );
  };

  const userGeneratedCategories = (index) => {
    return (
      <ul className="userGeneratedCategories">
        {customCategories.map((category) => {
          return (
            <div key={index}>
              <li>{category}</li>
              {/* Todo task quantity for specific category here: */}
              <div className="task-quantity">7</div>
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="sidebar">
      <div>
        {defaultCategories()}
        <div className="divider"></div>
        <div className="my-list">My Lists :</div>
        {userGeneratedCategories()}
      </div>
      <img src="../../src/assets/icons/chevron.svg" alt="chevron" />
    </div>
  );
};
