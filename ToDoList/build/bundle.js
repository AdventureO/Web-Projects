/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ClassTDL__ = __webpack_require__(1);



let host = "http://localhost:3001/tasks";

new __WEBPACK_IMPORTED_MODULE_0__ClassTDL__["a" /* default */](document.body, host, 1);
new __WEBPACK_IMPORTED_MODULE_0__ClassTDL__["a" /* default */](document.body, host, 2);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ToDoList {
    constructor(container, host, list_id) {
        this.host = host;
        this.list_id = list_id;
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
        let response = await fetch(this.host + "?list_id=" + this.list_id);
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
        let list_id = this.list_id;
        let checked = "";

        if (text == '') {
            alert("Write a task!!!")
        } else {
            const response = await fetch(this.host + "?list_id=" + this.list_id, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({text, checked, list_id})
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
            alert(this.host + "?list_id=" + this.list_id + "&id=" + id);
            await fetch(this.host + "?list_id=" + this.list_id + "&id=" + id, {
                    method: "DELETE"
                });
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
                            await fetch(this.host + "?list_id=" + this.list_id + "&id=" + id, {
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
            await fetch(this.host + "?list_id=" + this.list_id + "&id=" + id, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({text, checked})
            })
        }
    }
}


/* harmony default export */ __webpack_exports__["a"] = (ToDoList);

/***/ })
/******/ ]);