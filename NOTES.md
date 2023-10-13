<!-- ! Note: Focus on pure functions - single responsibility! -->

### Working on...

// Reminder: When working on this, be sure to keep it dynamic for all lists including custom lists:

- [] Handling Urgent list:
  - [] When deleting urgent task from Today, also delete same task from Urgent.
  - [] Completing a task in Urgent should delete the same task from Urgent as well.

### Tasks:

- [] Fix task rendering issue.
- [] Add a calendar for user to select todo task date.
- [] Add option to hide Sidebar.jsx.
- [] Option to delete all completed tasks.
  - Implement a "main" button that allows user to delete completed tasks (on any given list).
- [] Redesign custom list input element.

### Completed Tasks (filtered: latest completion @ end):

- [check] Show todo tasks only for the respective signed in user.
- [check] Edit button functionality in todo task items.
- [check] Guest user can create tasks.
- [check] If no changes are made while editing task, no changes should be made.
- [check] Instead of using placeholder in input, use value so data can be edited by user.
- [check] Fix issue where tasks are being created without any input data being entered.
- [check] Fix urgentFlag when editing task on modal.
- [check] Completed tasks are crossed off and lower opacity.
- [check] Freeze background when any modal is present.
- [check] Allow user to store tasks in different categories (work, personal, finance, ect...).
- [check] Adding custom lists.
- [check] Deal with how tasks will be stored and displayed for default lists.
- [check] Optimize read/write firestore operations.

- ## Problem #1: Clicking on an incomplete task in the Today list causes that same task to be duplicated in the Completed list.

  - If user clicks on a task, the task becomes either complete or incomplete by invoking `updateTodoTasksState()` function.
  - `updateTodoTasksState()` toggles the task.complete field to either true or false. The first click on any task will toggle task.complete to true by default.
  - If the task is toggled to true, `await moveTaskToCompleted(activeUserId, task)` function is invoked.
  - `await moveTaskToCompleted(activeUserId, task)` => deletes the task from Today and adds the same task (task ID) to the Completed list.
    - Bug => Potential duplication may be happening here since this function is the only one that adds a document to the Completed list.
  - If the task is toggled to false, `await addCompletedTaskToFirestore(activeUserId, task)` is invoked.
  - `await addCompletedTaskToFirestore(activeUserId, task)` => deletes the task from Completed and adds the same task to Today while updating task.complete field from false to true.

- ## Problem 2: Clicking on a task and making it "complete" renders all task items in completed collection. Why?
  - ### Issue:
    - This problem was the result of React state setter setSelectedList, FS onSnapshot listener and potentially an issue regarding data retrieval.
    - Recreating the bug => User clicks on a list like Today => useEffect is invoked with `fetchTodoCollection()` due to its dependency _selectedList_ => User adds a task in Today => onSnapshot attaches to Today to retrieve live data => user (quickly) clicks on another list like Completed => useEffect is invoked again with `fetchTodoCollection()` also being invoked since _selectedList_ being a dependency has changed again => User goes back to Today list => User completes task in Today list => onSnaphot ends up retrieving data from Completed instead of Today list even if selectedList is currently set to Today.
    - This bug is in part caused by the asynchronous nature of fetching data combined with _onSnapshot_.
  - ### Resolve:
    - In order to prevent onSnapshot from retrieving data it shouldn't, we need to stop the previous _listener_ before setting up a new listener. Bascially, have only one listener at a time since the issue was b/c there was a listener created for every list being clicked causing multiple listeners.
    - The idea is to use React useRef to ensure that when one listener is active, another isn't created until the previous listener has ended. Also, using a useRef prevent a re-render.
    ### Chat GPT:
    - The provided solution addresses the possible issue of overlapping Firestore listeners by ensuring that, before setting up a new listener, any previous listener is unsubscribed. This helps prevent scenarios where older listeners might overwrite the state with stale data after a new listener has already updated it. It's important to note that the effectiveness of this solution assumes that the `fetchTodoCollection` function sets up an `onSnapshot` listener and returns its corresponding unsubscribe function. If it doesn't, adjustments to the function would be necessary.
