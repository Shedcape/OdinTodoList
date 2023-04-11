"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunktodolist"] = self["webpackChunktodolist"] || []).push([["initialize"],{

/***/ "./src/modules/initialize.js":
/*!***********************************!*\
  !*** ./src/modules/initialize.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ initialize)\n/* harmony export */ });\n/* harmony import */ var _assets_things_to_do_icon_16_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/things-to-do-icon-16.jpg */ \"./src/assets/things-to-do-icon-16.jpg\");\n/* harmony import */ var _assets_plus_icon_17_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/plus-icon-17.jpg */ \"./src/assets/plus-icon-17.jpg\");\n\n\n\nfunction initialize() {\n  const body = document.querySelector('body');\n  body.innerHTML = `\n    <header>\n      <img class=\"logo\" src=\"./src/assets/things-to-do-icon-16.jpg\" alt=\"logo\">\n      <h1 class=\"logo-text\">To Do Central</h1>\n    </header>\n    <aside>\n      <h2 class=\"project-text\">Projects</h2>\n      <img class=\"new\" src=\"./src/assets/plus-icon-17.jpg\" alt=\"New Project\">\n      <div class=\"project-container\">\n      </div>\n    </aside>\n    <div class=\"container\" id=\"0\">\n    </div>\n    <button class=\"add-todoButton\">Add todo</button>\n    <div class=\"todoCard create-todo\" style=\"display:none\">\n      <input class=\"todoTitle createTitle\" type=\"text\" name=\"todotitle\" id=\"todotitle\" placeholder=\"Title of the Todo\">\n      <p class=\"todoCategory\">Description:</p>\n      <textarea class=\"newtodoinput\" name=\"tododesc\" id=\"tododesc\"></textarea>\n      <p class=\"todoCategory\">Due date:</p>\n      <input class=\"newtodoinput\" type=\"date\" name=\"tododuedate\" id=\"tododuedate\">\n      <p class=\"todoCategory\">Priority:</p>\n      <select class=\"priorityinput\" name=\"todopriority\" id=\"todopriority\">\n        <option value=\"Low\">Low</option>\n        <option value=\"Medium\">Medium</option>\n        <option value=\"High\">High</option>\n      </select>\n      <button class=\"add-button\" id=\"submittodo\">Add Todo</button>\n    </div>\n\n    <footer>\n      By Shedcape\n    </footer>`\n}\n\n//# sourceURL=webpack://todolist/./src/modules/initialize.js?");

/***/ }),

/***/ "./src/assets/plus-icon-17.jpg":
/*!*************************************!*\
  !*** ./src/assets/plus-icon-17.jpg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"5c9f82e6f15b24be694c.jpg\";\n\n//# sourceURL=webpack://todolist/./src/assets/plus-icon-17.jpg?");

/***/ }),

/***/ "./src/assets/things-to-do-icon-16.jpg":
/*!*********************************************!*\
  !*** ./src/assets/things-to-do-icon-16.jpg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"55f3ff2d868ac1c7e6d8.jpg\";\n\n//# sourceURL=webpack://todolist/./src/assets/things-to-do-icon-16.jpg?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/modules/initialize.js"));
/******/ }
]);