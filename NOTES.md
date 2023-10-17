<!-- ! Note: Focus on pure functions - single responsibility! -->

### Working on...

// Reminder: When working on this, be sure to keep it dynamic for all lists including custom lists:

### Tasks:

- [] Add a calendar for user to select todo task date.
- [] Option to delete all completed tasks.
- [] Allow task editing to be done directly on input element.
- [] Inside of taskEditModal, allow user to move current task to another list made by the user.
- [] Custom list should be lower case for consistency like default list.
- [] Implementing useMemo for expensive calculations over useEffect.

### Completed Tasks (filtered: latest completion @ end):

- [check] Fix task rendering issue.
- [check] Remove the taskInput option when selectedList is either on Urgent and Completed list.
- [check] when adding a new list to collection, the default task should contain a document field _showDoc_ where it will equal false. This field will be used to determine the rendering for total task count for each custom list.
- [check] Every task added goes into All list.
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
- [check] Handling Urgent list.

- # Problem #1: Clicking on an incomplete task in the Today list causes that same task to be duplicated in the Completed list.

  - If user clicks on a task, the task becomes either complete or incomplete by invoking `updateTodoTasksState()` function.
  - `updateTodoTasksState()` toggles the task.complete field to either true or false. The first click on any task will toggle task.complete to true by default.
  - If the task is toggled to true, `await moveTaskToCompleted(activeUserId, task)` function is invoked.
  - `await moveTaskToCompleted(activeUserId, task)` => deletes the task from Today and adds the same task (task ID) to the Completed list.
    - Bug => Potential duplication may be happening here since this function is the only one that adds a document to the Completed list.
  - If the task is toggled to false, `await addCompletedTaskToFirestore(activeUserId, task)` is invoked.
  - `await addCompletedTaskToFirestore(activeUserId, task)` => deletes the task from Completed and adds the same task to Today while updating task.complete field from false to true.

- # Problem 2: Clicking on a task and making it "complete" renders all task items in completed collection. Why?

  - ### Issue:
    - This problem was the result of React state setter setSelectedList, FS onSnapshot listener and potentially an issue regarding data retrieval.
    - Recreating the bug => User clicks on a list like Today => useEffect is invoked with `fetchTodoCollection()` due to its dependency _selectedList_ => User adds a task in Today => onSnapshot attaches to Today to retrieve live data => user (quickly) clicks on another list like Completed => useEffect is invoked again with `fetchTodoCollection()` also being invoked since _selectedList_ being a dependency has changed again => User goes back to Today list => User completes task in Today list => onSnaphot ends up retrieving data from Completed instead of Today list even if selectedList is currently set to Today.
    - This bug is in part caused by the asynchronous nature of fetching data combined with _onSnapshot_.
  - ### Resolve:
    - In order to prevent onSnapshot from retrieving data it shouldn't, we need to stop the previous _listener_ before setting up a new listener. Bascially, have only one listener at a time since the issue was b/c there was a listener created for every list being clicked causing multiple listeners.
    - The idea is to use React useRef to ensure that when one listener is active, another isn't created until the previous listener has ended. Also, using a useRef prevent a re-render.
    ### Chat GPT:
    - The provided solution addresses the possible issue of overlapping Firestore listeners by ensuring that, before setting up a new listener, any previous listener is unsubscribed. This helps prevent scenarios where older listeners might overwrite the state with stale data after a new listener has already updated it. It's important to note that the effectiveness of this solution assumes that the `fetchTodoCollection` function sets up an `onSnapshot` listener and returns its corresponding unsubscribe function. If it doesn't, adjustments to the function would be necessary.

- # Problem 3: Rendering an edited UI for tasks in the "all" list taking into account for tasks coming from different lists.

  - ## Issue:

    - The UI should display each task inside of "all" list but tasks should also be organized according to the task.list field.
    - If user generates custom lists, then each list should be a sub-heading within the "all" list.
    - If there are tasks for each of these list, the tasks should appear beneath the sub-heading of their respective task.list field data.

  - ## Process:

  - ## Brainstorm:
    - When mapping data for rendering, if selectedList is currently set to "all", I need to render a sub-heading for each necessary list.
      - I need to create an array that holds the list that includes _today_ and all user generated lists.
    - ? How am I going to connect each task list to the list sub-heading?
      - Create a conditional where if each task being mapped is equal to the sub-heading list, then display those.
      - The idea is to map out all tasks under _today_ then the other user generated lists.

- # Problem 4: In a custom list, I can create a new task then complete it. I can now go to the Completed list and click on it again to make the task incomplete. The task does this correctly: 1. goes back to All list under correct sub-heading (which is the custom list name) // 2. Task gets deleted from Completed list. Here is what incorrectly happens: 1. Task gets added to Today list even when task was originally generated from custom list // 2. Task does not go back to custom list.

  - # Brainstorm:
    - Each task has a doc field called _list_ which contains the string for the originating list.
    - Store the _clicked on task ID data within Completed_ to a React state to hold.
    - Use _list_ field as a parameter for the FS pathway along with the stored task ID.
    - Using this data, we can reference the originating list and restore the task when task becomes incomplete.
