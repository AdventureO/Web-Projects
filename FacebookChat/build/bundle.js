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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FacebookChat__ = __webpack_require__(1);


new __WEBPACK_IMPORTED_MODULE_0__FacebookChat__["a" /* default */](document.body, "https://res.cloudinary.com/demo/image/facebook/100007339754837.jpg");
new __WEBPACK_IMPORTED_MODULE_0__FacebookChat__["a" /* default */](document.body, "https://res.cloudinary.com/demo/image/facebook/100007410902996.jpg");
new __WEBPACK_IMPORTED_MODULE_0__FacebookChat__["a" /* default */](document.body, "https://res.cloudinary.com/demo/image/facebook/100007410902996.jpg");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FacebookChat {
    constructor(container, image) {
        this.image = image;
        this.root = document.createElement("div");
        this.root.innerHTML = this.initRender();
        this.root.classList.add("chat-box");
        container.appendChild(this.root);

        this.root
            .querySelector(".form")
            .addEventListener("submit", this.addMessage.bind(this));

        let message = document.createElement("div");
        message.classList = "my-message my-message_clear-fix";
        let chat = this.root.querySelector(".chat");
        chat.appendChild(message)
    }

    initRender() {
        return `
        <header class="header">
            <div class="header__presence"></div>
            <a href="" class="header__name">Kristaps Elsins</a>
            <a href=""><img src="images/Close.svg" alt="" class="chat-option chat-option_close"></a>
            <a href=""><img src="images/Cog.svg" alt="" class="chat-option chat-option_cog"></a>
            <a href=""><img src="images/Video.svg" alt="" class="chat-option chat-option_video"></a>
            <a href=""><img src="images/Plus.svg" alt="" class="chat-option chat-option_plus"></a>
        </header>
        <section class="chat">
            <div class="friend-message">
                <img src="${this.image}" alt="" class="friend-message__user-image">
                <p class="friend-message__text friend-message__text_normal">
                    Yo, Can you update views?
                </p>
            </div>
            <time class="chat__date">FRI 11:30AM</time>
            <div class="friend-message">
                <img src="${this.image}" alt="" class="friend-message__user-image">
                <p class="friend-message__text friend-message__text_normal">
                    I can’t see updated views yet
                </p>
            </div>
            <div class="my-message">
                <p class="my-message__text my-message__text_upper">
                    Hi, as I noted in Email last week - I am on vacation.
                </p>
                <p class="my-message__text my-message__text_down">
                    I will be back next week
                </p>
            </div>
            <div class="friend-message friend-message_clear-fix">
                <img src="${this.image}" alt="" class="friend-message__user-image">
                <p class="friend-message__text friend-message__text_upper">
                    Ahh sorry, missed that!
                </p>
                <p class="friend-message__text friend-message__text_down">
                    Let’s talk next week
                </p>
            </div>
        </section>
        <section class="message-creator">
            <div class="message-creator__line"></div>
            <form action="" class="form">
                <input type="text" class="message-creator__input" name="message" placeholder="Type a message...">
            </form>
            <div class="message-options">
                <a href=""><img src="images/Picture.svg" alt="" class="message-options__image"></a>
                <a href=""><img src="images/Gif.svg" alt="" class="message-options__image"></a>
                <a href=""><img src="images/Smile.svg" alt="" class="message-options__image"></a>
                <a href=""><img src="images/Calendar.svg" alt="" class="message-options__image"></a>
                <a href=""><img src="images/Camera.svg" alt="" class="message-options__image"></a>
            </div>
        </section>
        `
    }

    addMessage(ev) {
        ev.preventDefault();

        let form = ev.target;
        let text = form["message"].value;
        let chat = this.root.querySelector(".chat");
        let messageBar = chat.getElementsByClassName("my-message")[1];
        let messages = messageBar.getElementsByClassName("my-message__text");
        if (text !== "") {
            messageBar.innerHTML += `
            <p class="my-message__text my-message__text_normal my-message_clear-fix">
                ${text}
            </p>
            `;
            if (messages.length > 1) {
                for (let i = 0; i < messages.length; i++) {
                    if (i === 0) {
                        messages[i].classList = "my-message__text my-message__text_upper my-message_clear-fix";
                    } else if (i === messages.length - 1) {
                        messages[i].classList = "my-message__text my-message__text_down my-message_clear-fix";
                    } else {
                        messages[i].classList = "my-message__text my-message__text_middle my-message_clear-fix";
                    }
                }
            }

            form["message"].value = "";
        }

        chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (FacebookChat);


/***/ })
/******/ ]);