class BestToDoList {
    constructor(root_element, host) {
        this.root_elemet = root_element;
        this.taskList = this.root_elemet.querySelector(".tasks-list");
        this.form = this.root_elemet.querySelector(".tasks-block__form");
        this.data = [];
        this.host = host;
    }

    async getData() {
        let response = await fetch(this.host);
        this.data = await response.json();
    };

    async init() {
        this.getData().catch();
        this.data = await getData();
        this.renderList();
        // this.form.addEventListener("submit", this.addTask.bind(this));
        // this.taskList.addEventListener('click', this.editTask.bind(this));
        // this.taskList.addEventListener('click', this.removeTask.bind(this));
        // this.taskList.addEventListener('click', this.checkbox.bind(this));
    };

    renderList() {
        this.taskList.innerHTML = '<ul class="task-list">' + this.data.map( task => `
        <li taskId="${task.id}" class='task-${task.id} task' >
            <input type="checkbox" class="task__checkbox" ${task.checked}>
            <p class="task__text">${task.text}</p>
            <button class="task__remove-button">Remove</button>
            <button class="task__edit-button">Edit</button>
        </li>
    ` ).join("") + '</ul>'
    };

    async addTask(ev) {
        ev.preventDefault();
        let form = ev.target;
        let text = form["task"].value;
        let checked = "";

        if (text === '') {
            alert("Write a task!!!")
        } else {
            const response = await fetch(this.host, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({text, checked})
            });

            form["task"].value = '';
            const task = await response.json();
            this.data.push(task);
            this.renderList();
        }
    };

    // editTask(event) {
    //     let target = event.target;
    //     if (target.classList.contains("task__edit")) {
    //         target = this.findParentTask(target);
    //         let buttons = target.querySelector(".task__buttons");
    //         let checkBox = target.querySelector(".task__box-text");
    //         let taskId = target.getAttribute("task-id");
    //
    //         target.removeChild(buttons);
    //         target.removeChild(checkBox);
    //
    //         let editInput = document.createElement("input");
    //         editInput.classList.add("task_editable-text");
    //         editInput.setAttribute("value", checkBox.querySelector(".task__text").innerHTML);
    //         target.appendChild(editInput);
    //         target.querySelector(".task_editable-text").focus();
    //
    //         document.addEventListener("keydown", async (ev) => {
    //             if (ev.keyCode == 13) {
    //                 this.json_act.editData({"task-text": target.querySelector(".task_editable-text").value},taskId);
    //                 checkBox.querySelector(".task__text").innerHTML = target.querySelector(".task_editable-text").value;
    //             }
    //             if(ev.keyCode == 27 || ev.keyCode == 13){
    //                 target.removeChild(editInput);
    //                 target.appendChild(checkBox);
    //                 target.appendChild(buttons);
    //             }
    //         })
    //     }
    // };
    //
    // findParentTask(target){
    //     while (!target.classList.contains("task")) {
    //         target = target.parentNode;
    //     }
    //     return target;
    // }
    //
    // deleteTask(event) {
    //     let target = event.target;
    //     if (target.classList.contains("task__delete")) {
    //         target = this.findParentTask(target);
    //         this.json_act.deleteData(target.getAttribute("task-id"));
    //         this.tasksList.removeChild(target);
    //     }
    // }
    //
    // async checkbox(event) {
    //     let target = event.target;
    //     if (target.classList.contains("task__text")) {
    //         target = this.findParentTask(target);
    //         let changedCheck = false;
    //         if (target.querySelector(".task__check").checked === false) {
    //             changedCheck = true;
    //         }
    //
    //         let taskId = target.getAttribute("task-id");
    //         let task = {
    //             "checked": changedCheck
    //         };
    //         this.json_act.editData(task,taskId);
    //     }
    // }
}

let root_element = document.querySelector(".to-do-list-1");
let toDoList = new BestToDoList(root_element, 'http://localhost:3000/tasks/');
toDoList.init().catch();