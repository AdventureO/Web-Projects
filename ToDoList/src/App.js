import ToDoList from "./ClassTDL";


let host = "http://localhost:3001/tasks";

new ToDoList(document.body, host, 1);
new ToDoList(document.body, host, 2);