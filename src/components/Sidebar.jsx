import React, { useCallback, useContext, useEffect, useState } from "react";
import { ListContext, UserContext } from "../App";
import { addNewListToFirestore } from "../utils/addListToFirestore";
import { updateCustomListInFirestore } from "../utils/updateCustomListInFirestore";
import { updateCustomListState } from "../utils/updateCustomListState";
import {
  deleteListFromField,
  deleteListFromFirestore,
} from "../utils/deleteListFromFirestore";
import { getLengthOfList } from "../utils/getLengthOfList";

export const Sidebar = () => {
  const { activeUserId } = useContext(UserContext);
  const {
    defaultList,
    setSelectedList,
    selectedList,
    setCustomList,
    customList,
    listCounts,
    setListCounts,
  } = useContext(ListContext);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    const fetchAndUpdateCustomList = async () => {
      const updatedCustomList = await updateCustomListState(activeUserId);
      setCustomList(updatedCustomList);
    };
    fetchAndUpdateCustomList();
  }, [activeUserId, setCustomList]);

  const memoizedGetLengthOfList = useCallback(
    (list) => getLengthOfList(list, activeUserId),
    [activeUserId]
  );

  useEffect(() => {
    const fetchCount = async (list) => {
      const count = await memoizedGetLengthOfList(list);
      setListCounts((prevCounts) => ({ ...prevCounts, [list]: count }));
    };
    customList.forEach((list) => {
      fetchCount(list);
    });
  }, [customList, memoizedGetLengthOfList, setListCounts]);

  const handleAddingNewList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      const lowerCaseNewListName = newListName.toLowerCase();
      setCustomList((prev) => [...prev, lowerCaseNewListName]);
      try {
        updateCustomListInFirestore(activeUserId, lowerCaseNewListName);
        addNewListToFirestore(activeUserId, lowerCaseNewListName);
        setNewListName("");
      } catch (error) {
        console.log(`Error: ${error} - handleAddingNewList`);
      }
    }
  };

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
        <ul className="userCreatedList">
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
                <div className="task-quantity">{listCounts[list] || "..."}</div>
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
          <button className="submit " type="submit">
            +
          </button>
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
    </div>
  );
};
