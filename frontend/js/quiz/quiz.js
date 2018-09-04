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
/******/ 	return __webpack_require__(__webpack_require__.s = 124);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(48);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = __webpack_require__(1);
var layui = __webpack_require__(3);
var form;
var currentQues = 0;
var quesCount = 0;
var quizBody;
var quesRoute = new Array();
var answerArr = new Array();

function OnNextClick(quizID, data) {
    var nextQues;
    var ansObj = new Object();
    var quesType = data.quesType;
    var optionsObj = quizBody[currentQues].options;
    if (quesType === 'single') {
        nextQues = parseInt(quizBody[currentQues].nextQues);
    } else {
        var opt = parseInt(data.field.answer);
        nextQues = parseInt(optionsObj[opt].rel);
    }
    ansObj.quesNo = currentQues;
    ansObj.answer = data.field.answer;
    answerArr[quesCount] = ansObj;
    quesRoute[quesCount] = currentQues;
    if (nextQues > 0) {
        currentQues = nextQues - 1;
        quesCount++;
        RenderQuestion();
    } else {
        $.post('/quizApi/answer', { quizID: quizID, answer: (0, _stringify2.default)(answerArr) }, function (resp, stat) {
            alert('You have successfully finished this quiz!');
            window.location.href = '/';
        });
    }
    return false;
}

function RenderQuestion() {
    $('#optQuesTitle').html('');
    $('#textQuesTitle').html('');
    $('#optionArea').html('');
    $('#answerArea').val('');
    var ques = quizBody[currentQues];
    var quesName = ques.quesName;
    var optionArr = ques.options;
    if (currentQues === 0) {
        $('.prev').hide();
    } else {
        $('.prev').show();
    }
    $('.ques-number').html('Question ' + (quesCount + 1));
    $('.ques-text').html('' + quesName);
    if (parseInt(ques.answerType) === 2) {
        $('#optionQues').show();
        $('#textQues').hide();
        for (var i = 0; i < optionArr.length; i++) {
            var optionBody = document.getElementById('optAnswer').cloneNode(true);
            optionBody.value = i;
            optionBody.title = optionArr[i].text;
            if (i === 0) {
                optionBody.checked = true;
            }
            $('#optionArea').append($(optionBody)).append('<br />');
        }
        form.render('radio');
    } else {
        $('#optionQues').hide();
        $('#textQues').show();
    }
}

window.onload = function () {
    var quizID = document.getElementById('quizID').value;
    layui.use('form', function () {
        form = layui.form;
        form.on('submit(optNext)', function (data) {
            data.quesType = 'multiple';
            OnNextClick(quizID, data);
        });
        form.on('submit(textNext)', function (data) {
            data.quesType = 'single';
            OnNextClick(quizID, data);
        });
        form.on('submit(prev)', function (data) {
            currentQues = quesRoute[quesCount - 1];
            quesCount--;
            answerArr.pop();
            quesRoute.pop();
            RenderQuestion();
        });
    });
    document.getElementById('startQuiz').onclick = function () {
        $('#intro').hide();
        $.get('/quizApi/quiz', { quizID: quizID }, function (resp, stat) {
            quizBody = JSON.parse(resp.data.quizBody);
            RenderQuestion();
        });
    };
};

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = layui;

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(12);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ })

/******/ });