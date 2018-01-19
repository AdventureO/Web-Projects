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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Calendar__ = __webpack_require__(1);



new __WEBPACK_IMPORTED_MODULE_0__Calendar__["a" /* default */](document.body);
new __WEBPACK_IMPORTED_MODULE_0__Calendar__["a" /* default */](document.body);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Calendar {
    constructor (container) {
        this.root = document.createElement("div");
        this.root.innerHTML = this.initRender();
        this.date = new Date();
        this.root.classList.add("element");
        container.appendChild(this.root);

        this.root
            .querySelector(".calendar__next-month-button")
            .addEventListener("click", this.changeDate.bind(this));

        this.root
            .querySelector(".calendar__previous-month-button")
            .addEventListener("click", this.changeDate.bind(this));

        this.root
            .querySelector(".calendar__next-year-button")
            .addEventListener("click", this.changeDate.bind(this));

        this.root
            .querySelector(".calendar__previous-year-button")
            .addEventListener("click", this.changeDate.bind(this));

        this.displayCalendar();
    }

    initRender() {
        return `
            <header class="calendar">
                <span class="calendar__year calendar__year-month"></span>
                <span class="calendar__month calendar__year-month"></span>
                <input class="calendar__previous-month-button calendar__button" type="submit" value="&#x3c;"/>
                <input class="calendar__next-month-button calendar__button" type="submit" value="&#x3e;"/>
                <input class="calendar__previous-year-button calendar__button" type="submit" value="&#x3c;"/>
                <input class="calendar__next-year-button calendar__button" type="submit" value="&#x3e;"/>
            </header>
            <main>
                <section class="calendar__week">
                    <span class="calendar__week-days calendar__days">Mon</span>
                    <span class="calendar__week-days calendar__days">Tue</span>
                    <span class="calendar__week-days calendar__days">Wed</span>
                    <span class="calendar__week-days calendar__days">Thu</span>
                    <span class="calendar__week-days calendar__days">Fri</span>
                    <span class="calendar__week-days calendar__days">Sat</span>
                    <span class="calendar__week-days calendar__days">Sun</span>
                </section>
                <section class="calendar__numbers calendar__month-days"></section>
            </main>
        `
    }

    displayCalendar () {
        let nowDate = new Date();
        let month = this.date.getMonth();
        let day = this.date.getDate();
        let year = this.date.getFullYear();

        let nextMonth = month + 1;
        let nextDate = new Date(nextMonth + ' 1 ,' + year);
        let weekdays = nextDate.getDay() - 1;
        let FebNumberOfDays = 28;

        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        if ((month === 1) && (year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)){
            FebNumberOfDays = 29;
        }

        let dayPerMonth = ["31","" + FebNumberOfDays + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
        let numOfDays = dayPerMonth[month];

        let counter = 1;
        let calendar = this.root.querySelector('.calendar__numbers');
        while (calendar.firstChild) {
            calendar.removeChild(calendar.firstChild);
        }

        while (counter <= numOfDays) {
            let newDay = document.createElement('section');
            if (weekdays > 0) {
                calendar.appendChild(newDay);
                weekdays--;
            } else {
                if ((counter === day) && (month === nowDate.getMonth()) && (year === nowDate.getFullYear())) {
                    newDay.className = 'calendar__days calendar__current-day';
                } else {
                    newDay.className = 'calendar__days calendar__number-days';
                }
                newDay.innerText = counter;
                calendar.appendChild(newDay);
                counter++;
            }
        }

        this.root.querySelector(".calendar__month").innerHTML = monthNames[month];
        this.root.querySelector(".calendar__year").innerHTML = year.toString();
        this.root.querySelector(".calendar__numbers").value = calendar;
    }

    changeDate (ev) {
        const button = ev.target;

        if (button.classList.contains("calendar__next-month-button")) {
            if (this.date.getMonth() === 12)
                this.date.setMonth(1);
            this.date.setMonth(this.date.getMonth() + 1);
            this.displayCalendar();
        } else if (button.classList.contains('calendar__previous-month-button')) {
            if (this.date.getMonth() === 12)
                this.date.setMonth(1);
            this.date.setMonth(this.date.getMonth() - 1);
            this.displayCalendar();
        } else if (button.classList.contains('calendar__next-year-button')) {
            this.date.setYear(this.date.getFullYear() + 1);
            this.displayCalendar();
        } else if (button.classList.contains('calendar__previous-year-button')) {
            this.date.setYear(this.date.getFullYear() - 1);
            this.displayCalendar();
        }
    }
}


/* harmony default export */ __webpack_exports__["a"] = (Calendar);

/***/ })
/******/ ]);