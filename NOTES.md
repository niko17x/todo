<!-- ! Note: Focus on pure functions - single responsibility! -->

### Working on...

- [] Optimize read/write firestore operations.
  - Focus especially on read operations.

### Tasks:

- [] Handle default list (all, urgent, completed) with proper data.
  - Add appropriate tasks to list at time of creation or time of field status change (ie: urgentFlag: true => false).
  - Implement batched writes for atomicity (less "roundtrips" to FS).
- [] Add a calendar for user to select todo task date.
- [] Add option to hide Sidebar.jsx.
- [] Option to delete all completed tasks.
  - Implement a "main" button that allows user to delete completed tasks (on any given list).
- [] Redesign custom list input element.

### Completed Tasks:

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

### Thoughts:

### Edits Made:

1. App.jsx - Added a conditional statement in useEffect to only run if condition is met. Added a new doc field called "hasDefaultList" in each user collection in FS. The purpose of this addition is to load the default state "default list" based on the boolean value of hasDefaultList to conserve read operations in FS.
2. Sidebar.jsx - Removed the "customList" dependency in useEffect. The useEffect is invoking "setCustomList" which in turn, the dependency is being updated with "customList" causing a constant re-trigger causing additional read/write operations.
