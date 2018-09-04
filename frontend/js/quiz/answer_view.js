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
/******/ 	return __webpack_require__(__webpack_require__.s = 125);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(13);
var $ = __webpack_require__(1);

var layer;
var answerList;
var quesArr;

window.onload = function () {
    RenderAnswerList();
    layui.use('layer', function () {
        layer = layui.layer;
        $('.viewAnswer').click(function (btn) {
            var answerID = parseInt($(btn.target).parents('#ansRow').find('.ansID').html()) - 1;
            layer.open({
                type: 1,
                title: 'Answer List',
                content: $('#answerText'),
                success: function success(dom, index) {
                    $('#answerText').empty();
                    var quesArr = JSON.parse(answerList[answerID].quizBody);
                    var answerArr = JSON.parse(answerList[answerID].answerBody);
                    for (var i = 0; i < answerArr.length; i++) {
                        var answerElem = $('#answerElem').clone(true);
                        var ques = quesArr[answerArr[i].quesNo];
                        var answerStr = '';
                        if (parseInt(ques.answerType) >= 2) {
                            var optAnswerNo = parseInt(answerArr[i].answer);
                            answerStr = ques.options[optAnswerNo].text;
                        } else {
                            answerStr = answerArr[i].answer;
                        }
                        answerElem.find('#ques').append(ques.quesName);
                        answerElem.find('#ans').append(answerStr);
                        $('#answerText').append(answerElem);
                    }
                }
            });
        });
    });

    document.getElementById('homepage').onclick = function () {
        window.location.href = '/';
    };
};

function RenderAnswerList() {
    $.get('/quizapi/answer_list', {}, function (resp, stat) {
        answerList = resp.data;
        for (var i = 0; i < answerList.length; i++) {
            var answerRow = $('#ansRow').clone(true);
            answerRow.find('.ansID').html(answerList[i].answerID);
            answerRow.find('.quizName').html(answerList[i].quizName);
            answerRow.find('.ansCreator').html(answerList[i].answerIP);
            $('#answerList').append(answerRow);
        }
    });
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