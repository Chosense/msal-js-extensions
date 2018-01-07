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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/**
 * Tools and utilities for working with MSAL.js.
 */
class MsalService {
    /**
     * Creates a new instance of the class.
     * @param userAgentApp An instance of the UserAgentApplication class that the MsalService instance will use.
     */
    constructor(userAgentApp) {
        this._userAgentApp = userAgentApp;
    }
    /**
     * Returns the currently initialized instance of the MsalService class. Use the initCurrent()
     * method to initialize the instance.
     * After the current instance has been initialized, you can conveniently use it in your
     * application with MsalService.current.
     * */
    static get current() {
        return MsalService._current;
    }
    /**
     * Initializes the current instance of the MsalService.
     * @param userAgentApp The UserAgentApplication instance to init the current MsalService with.
     */
    static initCurrent(userAgentApp) {
        MsalService._current = new MsalService(userAgentApp);
    }
    /**
     * Returns the current UserAgentApplication instance that the MsalService is using.
     */
    get userAgentApp() {
        return this._userAgentApp;
    }
    /**
     * Attempts to get the current user. If the current user is known, we return that user right away.
     * If the user has not authenticated, then a popup window is used to authenticate the user
     * and then the user information is returned.
     *
     * @param scopes Optional. The scopes you want the user to consent to. Defaults to ["user.read"].
     */
    tryGetUserPopup(scopes) {
        var usr = this.userAgentApp.getUser();
        if (usr) {
            return Promise.resolve(usr);
        }
        else {
            return this.userAgentApp.loginPopup(this.fixScopes(scopes))
                .then(idToken => {
                usr = this.userAgentApp.getUser();
            })
                .then(() => {
                return usr;
            });
        }
    }
    fixScopes(scopes) {
        if (scopes && scopes.length)
            return scopes;
        return ["user.read"];
    }
}
/* harmony export (immutable) */ __webpack_exports__["MsalService"] = MsalService;



/***/ })
/******/ ]);
//# sourceMappingURL=msal-js-extensions.js.map