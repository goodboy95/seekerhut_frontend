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
/******/ 	return __webpack_require__(__webpack_require__.s = 126);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(13);
var $ = __webpack_require__(1);
var quizArr = new Array();

window.onload = function () {
    var quizVue = new Vue({
        el: '#quizList',
        data: {
            quizList: quizArr
        }
    });
    $.get('/quizApi/quiz_list', {}, function (resp, stat) {
        var quizList = resp.data;
        for (var i = 0; i < quizList.length; i++) {
            quizList[i].url = 'http://www.seekerhut.com/quiz/quizpage/' + quizList[i].quizID;
            quizArr.push(quizList[i]);
        }
    });

    document.getElementById('homepage').onclick = function () {
        window.location.href = '/';
    };
};

function EditQuesGroup(editBtn) {
    var quesNum = parseInt($(editBtn).parents('.quiz-row').find('.quesID').html());
    window.location.href = '/quiz/createquiz/' + quesNum;
}

function GotoQuiz(quizBtn) {
    var quesNum = parseInt($(quizBtn).parents('.quiz-row').find('.quesID').html());
    window.location.href = '/quiz/quizpage/' + quesNum;
}

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function headerMenu() {
    document.getElementById('create').onclick = function () {
        window.location.href = '/quiz/createquiz';
        return false;
    };
    document.getElementById('quiz-manage').onclick = function () {
        window.location.href = '/home/quizmanage';
        return false;
    };
    document.getElementById('answer-manage').onclick = function () {
        window.location.href = '/home/answerview';
        return false;
    };
    var userdata = new Vue({
        el: '#userdata',
        data: {
            username: '234'
        }
    });
}

module.exports = headerMenu();

/***/ })

/******/ });