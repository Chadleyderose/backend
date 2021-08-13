# TODO LIST

> Please add tasks if needed

| Completed  | Uncompleted | Task                          | Branch - Name                                                                |
| ---------- | ----------- | ----------------------------- | ---------------------------------------------------------------------------- |
| :thumbsup: |             | Create Register Router        | [ChadH28](https://github.com/Shane-kolkoto/Mind-Body-Soul/tree/Chads-fruits) |
| :thumbsup: |             | Create Login Router           | [Login]()                                                                    |
| :thumbsup: |             | Create Verify Router          | [Verify]()                                                                   |
| :thumbsup: |             | Create Forgot-password Router | [Forgot-pw]()                                                                |
| :thumbsup: |             | Create Reset-password Router  | [Reset-pw]()                                                                 |

# Application folder
> *This Folder is linked with* **auth/_helpers.js**

Example:
```Ruby
router.post("/register", (req, res) => {
  return authHelpers
    .createUser(req, res)

});
```
> Im calling a pre built fuction with =in the **auth/_helpers.js** *check it out!*