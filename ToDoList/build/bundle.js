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
/***/ (function(module, exports) {

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
            <input type="checkbox" class="task__checkbox">
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
                    }
                })
            }
        }

    });

getData().catch();
render(data);

document.getElementById("addTask")
    .addEventListener("submit", async (ev) => {
        ev.preventDefault();

        let form = ev.target;
        let text = form["task"].value;

        if (text === '') {
            alert("Write a task!!!")
        } else {
            const response = await fetch(host, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({text})
            });

            form["task"].value = '';
            const task = await response.json();
            data.push(task);
            render(data);
        }
    });

/***/ })
/******/ ]);