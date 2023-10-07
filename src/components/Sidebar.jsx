import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { addNewListToFirestore } from "../utils/addListToFirestore";
import { updateCustomListInFirestore } from "../utils/updateCustomListInFirestore";
import { updateCustomListState } from "../utils/updateCustomListState";
import {
  deleteListFromField,
  deleteListFromFirestore,
} from "../utils/deleteListFromFirestore";

export const Sidebar = () => {
  const { defaultList, activeUserId, setSelectedList, selectedList } =
    useContext(DataContext);
  const [customList, setCustomList] = useState([]);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    const fetchAndUpdateCustomList = async () => {
      const updatedCustomList = await updateCustomListState(activeUserId);
      setCustomList(updatedCustomList);
    };
    fetchAndUpdateCustomList();
  }, [activeUserId]);

  const handleAddingNewList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      setCustomList((prev) => [...prev, newListName]);
      try {
        updateCustomListInFirestore(activeUserId, newListName);
        addNewListToFirestore(activeUserId, newListName);
        setNewListName("");
      } catch (error) {
        console.log(`Error: ${error} - handleAddingNewList`);
      }
    }
  };

  // Delete list from customList state and from Firestore sub collection.
  const handleListDeletion = async (list) => {
    try {
      await deleteListFromFirestore(activeUserId, list);
      await deleteListFromField(activeUserId, list);
      setCustomList((prev) => prev.filter((data) => data !== list));
      setSelectedList("today");
    } catch (error) {
      console.log(`Error: ${error} - handleListDeletion`);
      // If something fails, revert customList to previous.
      setCustomList((prev) => [...prev, list]);
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
          {customList.map((list, index) => {
            return (
              <div
                key={index}
                className={
                  selectedList === list ? "selected custom-list" : "custom-list"
                }
                onClick={() => setSelectedList(list)}
              >
                <li>{list}</li>
                <div className="task-quantity">7</div>
                <img
                  src="../../src/assets/icons/trash.svg"
                  onClick={() => handleListDeletion(list)}
                />
              </div>
            );
          })}
          <input
            name="new-list"
            type="text"
            placeholder="Add New List"
            value={newListName}
            maxLength={17}
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
