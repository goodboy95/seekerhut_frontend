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
/******/ 	return __webpack_require__(__webpack_require__.s = 80);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = layui;

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(1);
var layui = __webpack_require__(3);

var replyArr = new Array();

window.onload = function () {
    //SocketConnect(close, SocketReceive, error);
    var replyVue = new Vue({
        el: '#replyList',
        data: { replies: replyArr }
    });
    document.getElementById('menu-myblog').classList.add('layui-this');

    var layedit,
        contentBox,
        replyNum,
        id = document.getElementById('blogID').innerHTML,
        finalPage = false,
        replies = '';

    layui.use('layedit', function () {
        layedit = layui.layedit;
        contentBox = layedit.build('replyText');
    });
    layui.use('flow', function () {
        var flow = layui.flow;
        flow.load({
            elem: '#replyList',
            done: function done(page, next) {
                $.get('/api/blog/replylist/', { blogID: id, pageNo: page, pageSize: 5 }, function (resp) {
                    if (parseInt(resp.code) === 0) {
                        replyNum = resp.data.ReplyNum;
                        var replyList = resp.data.ReplyList;
                        for (var i = 0; i < replyList.length; i++) {
                            var author = replyList[i].author;
                            var content = replyList[i].content;
                            var replyObj = { author: author, content: content };
                            replyArr.push(replyObj);
                        }
                        next('', page * 5 < replyNum);
                        if (page * 5 >= replyNum) {
                            finalPage = true;
                        }
                    } else {
                        return;
                    }
                });
            }
        });
    });

    document.getElementById('replySubmit').onclick = function () {
        var replyContent = layedit.getContent(contentBox);
        var userName = Cookies.get('username');
        var authorID = document.getElementById('authorID').innerHTML;
        $.post('/api/blog/reply/', {
            blogAuthorID: authorID,
            blogID: id,
            content: replyContent,
            __RequestVerificationToken: $('#token').find('input').val()
        }, function (resp) {
            if (resp.code === 0) {
                alert('回复成功！');
                if (!finalPage) {
                    replyNum++;
                } else {
                    var replyObj = { author: userName, content: replyContent };
                    replyArr.push(replyObj);
                }
                //layedit.setContent(contentBox, '');
            } else {
                alert(resp.msg);
            }
        });
    };
};

/***/ })

/******/ });