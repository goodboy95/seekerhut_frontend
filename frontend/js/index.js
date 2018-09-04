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
/******/ 	return __webpack_require__(__webpack_require__.s = 76);
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

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(1);
var layui = __webpack_require__(3);

layui.use('layer', function () {
    var layer = layui.layer;

    window.onload = function () {
        var username = Cookies.get('username');
        if (username != undefined) {
            $('#reg').hide();
            $('#login').hide();
            $('#userdata').show();
            var userid = Cookies.get('id');
            document.getElementById('user').innerHTML += '<a href=\'/user/userinfo?id=' + userid + '\'>' + username + '</a>';
        }
        document.getElementById('regWindow').onclick = function () {
            layer.open({
                type: 1,
                title: '注册',
                content: $('#reg')
            });
        };
        document.getElementById('regSubmit').onclick = function () {
            $.post('/api/home/register/', {
                __RequestVerificationToken: $('#reg').find('#token').find('input').val(),
                username: $('#reg').find('#reg-username').val(),
                password: md5($('#reg').find('#reg-password').val())
            }, function (resp) {
                if (resp.code === 0) {
                    alert('用户注册成功！');
                    location.reload();
                } else {
                    alert(resp.msg);
                }
            });
        };
        document.getElementById('loginSubmit').onclick = function () {
            $.post('/api/home/login/', {
                __RequestVerificationToken: $('#login').find('#token').find('input').val(),
                username: $('#login').find('#login-username').val(),
                password: md5($('#login').find('#login-password').val())
            }, function (resp) {
                if (resp.code === 0) {
                    alert('登录成功！');
                    location.reload();
                } else {
                    alert(resp.msg);
                }
            });
        };
    };
});

/***/ })

/******/ });