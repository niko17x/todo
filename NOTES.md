### Tasks:

<!-- ! Note: Focus on pure functions - single responsibility! -->

- [] Adding custom lists.
- [] Deal with how tasks will be stored and displayed for default lists.

- [] Filtering tasks.
- [] Add a calendar for user to select todo task date.
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

### Thoughts:
Here is my firestore data:
- collection: todo
  - document: userId
    - sub collections:
      - all
      - completed
      - today
      - urgent
      - groceries
      - coding
      
I need to be able to retrieve "groceries" and "coding" from this sub collection and put that data into a react state array. Is this possible?