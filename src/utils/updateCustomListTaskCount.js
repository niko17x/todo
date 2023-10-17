// Update the listCounts state.

export const updateCustomListTaskCount = (
  setListCounts,
  selectedList,
  operator
) => {
  const operation = operator === "subtract" ? -1 : +1;
  setListCounts((prevCount) => ({
    ...prevCount,
    [selectedList]: prevCount[selectedList] + operation,
  }));
};
