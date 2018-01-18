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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__carousel__ = __webpack_require__(1);


new __WEBPACK_IMPORTED_MODULE_0__carousel__["a" /* default */](document.body, [
    'images/fly.jpg',
    'images/bee.jpg',
    'images/bug.jpeg'
]);

new __WEBPACK_IMPORTED_MODULE_0__carousel__["a" /* default */](document.body, [
    'images/fly.jpg',
    'images/bee.jpg',
    'images/bug.jpeg'
]);

new __WEBPACK_IMPORTED_MODULE_0__carousel__["a" /* default */](document.body, [
    'images/fly.jpg',
    'images/bee.jpg',
    'images/bug.jpeg'
]);

new __WEBPACK_IMPORTED_MODULE_0__carousel__["a" /* default */](document.body, [
    'images/fly.jpg',
    'images/bee.jpg',
    'images/bug.jpeg'
]);

new __WEBPACK_IMPORTED_MODULE_0__carousel__["a" /* default */](document.body, [
    'images/fly.jpg',
    'images/bee.jpg',
    'images/bug.jpeg'
]);

new __WEBPACK_IMPORTED_MODULE_0__carousel__["a" /* default */](document.body, [
    'images/fly.jpg',
    'images/bee.jpg',
    'images/bug.jpeg'
]);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Carousel {
    constructor (container, images) {
        this.images= images;
        this.index = 0;
        this.root = document.createElement("div");
        this.root.innerHTML = this.render();
        this.root.classList.add("Carousel");

        this.root
            .querySelector(".Carousel__next")
            .addEventListener("click", this.next.bind(this));

        this.root
            .querySelector(".Carousel__prev")
            .addEventListener("click", this.prev.bind(this));

        container.appendChild(this.root);
    }

    next () {
        this.index ++;
        this.move();
    }

    prev () {
        this.index --;
        this.move();
    }

    move () {
        if (this.index < 0) {
            this.root.querySelectorAll(".Carousel__img")
                [ (this.images.length) + (this.index % this.images.length) -1 ].style.left = ((this.index) * 550) + "px";
        } else {
            this.root.querySelectorAll(".Carousel__img")
                [this.index % this.images.length].style.left = ((this.index) * 550) + "px";
        }
        this.root.querySelector(".Carousel__frame").style.left = -(this.index * 550)  + "px";
    }

    render () {
        return `
            <div class="Carousel__frame">
                ${this.images.map( (img, index) => `
                    <img class="Carousel__img" 
                        src="${img}"
                        style="left: ${index * 550}px"
                    />
                `).join("")}    
            </div>
            <button class="Carousel__prev">&#x2190;</button>
            <button class="Carousel__next">&#x2192;</button>
        `
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Carousel);

/***/ })
/******/ ]);