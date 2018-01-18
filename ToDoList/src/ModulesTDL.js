let data = [];
let host = "http://localhost:3000/tasks/";


const getData = async () => {
    let response = await fetch(host);
    data = await response.json();
    render(data);
};

const render  = (data) => {
    document.getElementById("taskList").innerHTML = '<ul class="task-list">' + data.map( task => `
        <li taskId="${task.id}" class='task-${task.id} task' >
            <input type="checkbox" class="task__checkbox" ${task.checked}>
            <p class="task__text">${task.text}</p>
            <button class="task__remove-button">Remove</button>
            <button class="task__edit-button">Edit</button>
        </li>
    ` ).join("") + '</ul>'
};

document.getElementById("taskList")
    .addEventListener("click", async (ev) => {
        const button = ev.target;
        if (button.classList.contains("task__remove-button")) {
            const id = button.parentElement.getAttribute("taskId");
            await fetch(host + id, {method: "DELETE"});
            const index = data.findIndex( (el) => el.id == id);
            data = data.slice(0,index).concat(data.slice(index+1));
            render(data);

        } else if (button.classList.contains("task__edit-button")) {
            const id = button.parentElement.getAttribute("taskId");
            let t = document.getElementsByClassName('task-' + id)[0];
            if (t.getElementsByClassName("task__edit-input").length == 0) {
                let editInput = document.createElement("input");
                let textNode = t.children[1];
                textNode.style.zIndex = -1;
                editInput.setAttribute("type", "text");
                editInput.setAttribute("class", "task__edit-input");
                editInput.setAttribute("value", textNode.textContent);
                t.insertBefore(editInput, textNode);


                document.addEventListener("keydown", async (event) => {
                    if (event.keyCode === 13) {
                        let text = editInput.value;
                        if (text !== "") {
                            textNode.textContent = text;
                            t.removeChild(editInput);
                            textNode.style.zIndex = 0;
                            await fetch(host + id, {
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
                })
            }
        } else if (button.classList.contains("task__checkbox")) {
            const id = button.parentElement.getAttribute("taskId");
            let parentNode = document.getElementsByClassName('task-' + id)[0];
            let isChecked = parentNode.children[0].checked;
            let text = parentNode.children[1].textContent;
            let checked = "";
            if (isChecked) {
                checked = "checked"
            }
            //     parentNode.style.backgroundColor = "#AF4D0C";
            //     parentNode.children[1].style.color = "#d9ad7c";
            // } else {
            //     parentNode.style.backgroundColor = "#d9ad7c";
            //     parentNode.children[1].style.color = "#674d3c";
            // }
            await fetch(host + id, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({text, checked})
            });
        }

    });

getData().catch();
render(data);

document.getElementById("addTask")
    .addEventListener("submit", async (ev) => {
        ev.preventDefault();

        let form = ev.target;
        let text = form["task"].value;
        let checked = "";

        if (text === '') {
            alert("Write a task!!!")
        } else {
            const response = await fetch(host, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({text, checked})
            });

            form["task"].value = '';
            const task = await response.json();
            data.push(task);
            render(data);
        }
    });
