class ToDoList {
    constructor(container, host) {
        this.host = host;
        this.root = document.createElement("div");
        this.root.innerHTML = this.initRender();
        this.root.classList.add("to-do-list");
        container.appendChild(this.root);
        this.root
            .querySelector(".addTask")
            .addEventListener("submit", this.addData.bind(this));

        this.root
            .querySelector(".taskList")
            .addEventListener("click", this.removeData.bind(this));

        this.root
            .querySelector(".taskList")
            .addEventListener("click", this.editData.bind(this));

        this.root
            .querySelector(".taskList")
            .addEventListener("click", this.checkBox.bind(this));

        this.data = [];
        this.getData();
    }

    async getData() {
        let response = await fetch(this.host);
        this.data = await response.json();
        this.render();
    }

    initRender() {
        return `
        <form class="addTask form">
            <h2 class="form__title">My own to do list</h2>
            <input class="form__input-task" type="text" name="task" placeholder="Learn JavaScript"/>
            <button class="form__button">Add task</button>
        </form>
        <section class="taskList"></section>
        `
    }

    render() {
        let a = '';
        for (let i = 0; i < this.data.length; i++) {
            let b,c = "";
            if (this.data[i].checked === "checked") {
                b = "task__text_checked";
                c = "task_checked";
            } else {
                b = "task__text"
            }
            a +=
             `
            <li taskId="${this.data[i].id}" class='task-${this.data[i].id} task ${c}' >
                <input type="checkbox" class="task__checkbox" ${this.data[i].checked}>
                <p class="${b}">${this.data[i].text}</p>
                <button class="task__remove-button">Remove</button>
                <button class="task__edit-button">Edit</button>
            </li>
            `
        }
        this.root.querySelector(".taskList").innerHTML = '<ul class="task-list">' + a + '</ul>';
    }

    async addData(ev) {
        ev.preventDefault();

        let form = ev.target;
        let text = form["task"].value;
        let checked = "";

        if (text == '') {
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
            this.render();
        }
    }

    async removeData(ev) {
        const button = ev.target;
        if (button.classList.contains("task__remove-button")) {
            const id = button.parentElement.getAttribute("taskId");
            await fetch(this.host + id, {method: "DELETE"});
            const index = this.data.findIndex((el) => el.id == id);
            this.data = this.data.slice(0, index).concat(this.data.slice(index + 1));
            this.render();
        }
    }

    async editData(ev) {
        const button = ev.target;
        if (button.classList.contains("task__edit-button")) {
            const id = button.parentElement.getAttribute("taskId");
            let t = this.root.getElementsByClassName('task-' + id)[0];
            if (t.getElementsByClassName("task__edit-input").length == 0) {
                let editInput = document.createElement("input");
                let textNode = t.children[1];
                textNode.style.zIndex = -1;
                editInput.setAttribute("type", "text");
                editInput.setAttribute("class", "task__edit-input");
                editInput.setAttribute("value", textNode.textContent);
                t.insertBefore(editInput, textNode);

                this.root.addEventListener("keydown", async (event) => {
                    if (event.keyCode === 13) {
                        let text = editInput.value;
                        if (text !== "") {
                            textNode.textContent = text;
                            t.removeChild(editInput);
                            textNode.style.zIndex = 0;
                            await fetch(this.host + id, {
                                method: 'PATCH',
                                headers: {
                                    "Content-type": "application/json"
                                },
                                body: JSON.stringify({text})
                            });
                        } else {
                            alert("Write a task!!!")
                        }
                    } else if (event.keyCode === 27) {
                        t.removeChild(editInput);
                        textNode.style.zIndex = 0;
                    }
                });

                this.root.removeEventListener();
            }
        }
    }

    async checkBox(ev) {
        const button = ev.target;
        if (button.classList.contains("task__checkbox")) {
            const id = button.parentElement.getAttribute("taskId");
            let parentNode = this.root.getElementsByClassName('task-' + id)[0];
            let isChecked = parentNode.children[0].checked;
            let text = parentNode.children[1].textContent;
            let checked = "";
            if (isChecked) {
                checked = "checked";
                parentNode.classList.add("task_checked");
                parentNode.children[1].setAttribute("class", "task__text_checked");
            } else {
                parentNode.classList.remove("task_checked");
                parentNode.children[1].setAttribute("class", "task__text");
            }
            await fetch(this.host + id, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({text, checked})
            })
        }
    }
}


export default ToDoList;