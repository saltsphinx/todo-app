Stack: Express, Sqlite3, Node, React

Pages: Login, Signup, Todo dashboard

Endpoints: GET /user, /todo

Description: A todo list app that has users, and allows them to track tasks through todos. There will be a sign up and login page, and the dashboard will display the todos particular to that users. Todos have a description, and toggled on and off, ie. completed or uncompleted.

We'll start with the todo functionality and add the login/signup later since I underestimated what it would take to build.
Next, we'll build the todo page based on the wireframe I created. React Router will still be used even though currently theres only a single page.
- Create the end points. GET /todos, POST /todos, UPDATE /todos, DELETE /todos

Root
├ Header
└ Todo View
    ├ Todo Header
    └ Todo Table
        └ Todo
Data:
User, password should be a hash.
- id, integer, PK, unique, auto iterate
- username, text, not null, unique
- password, text, not null

Todo
- id, integer, PK, unique, auto iterate
- user_id, integer, FK, not null
- description, text, not null
- is_complete, bool/integer, not null