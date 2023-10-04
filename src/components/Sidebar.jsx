import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { addNewListToFirestore } from "../utils/addNewListToFirestore";

export const Sidebar = () => {
  const { defaultList, activeUserId, setSelectedList, selectedList } =
    useContext(DataContext);
  const [customList, setCustomList] = useState([]);
  const [newListName, setNewListName] = useState("");

  const handleAddingNewList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      addNewListToFirestore(activeUserId, newListName);
      setCustomList((prev) => [...prev, newListName]);
      setNewListName("");
    }
  };

  const mapDefaultList = () => {
    return (
      <ul className="defaultList">
        {defaultList.map((list, index) => {
          return (
            <li
              className={selectedList === list ? "selected" : ""}
              key={index}
              onClick={() => setSelectedList(list)}
            >
              {list}
            </li>
          );
        })}
      </ul>
    );
  };

  const mapCustomList = () => {
    return (
      <form onSubmit={handleAddingNewList}>
        <ul className="userGeneratedCategories">
          {customList.map((category, index) => {
            return (
              <div key={index}>
                <li>{category}</li>
                <div className="task-quantity">7</div>
              </div>
            );
          })}
          <input
            name="new-list"
            type="text"
            placeholder="Add New List"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button type="submit">+</button>
        </ul>
      </form>
    );
  };

  return (
    <div className="sidebar">
      <div>
        {mapDefaultList()}
        <div className="divider"></div>
        <div className="my-list">My Lists :</div>
        {mapCustomList()}
      </div>
      <img
        className="chevron"
        src="../../src/assets/icons/chevron.svg"
        alt="chevron"
      />
    </div>
  );
};
