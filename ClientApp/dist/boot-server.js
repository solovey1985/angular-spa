(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ClientApp/boot-server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ClientApp/boot-server.ts":
/*!**********************************!*\
  !*** ./ClientApp/boot-server.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var aspnet_prerendering_1 = __webpack_require__(/*! aspnet-prerendering */ "./node_modules/aspnet-prerendering/index.js");
exports.default = aspnet_prerendering_1.createServerRenderer(function (params) {
    return new Promise(function (resolve, reject) {
        var html = "<h1>Hello, World from JS!</h1>\n            <p>Current time in node: " + new Date() + " </p>\n            <p>data:" + params.data.isAdministrator + "</p>\n            <p>data:" + params.data.cookies[2].key + "</p>\n            <p>URL:" + params.location.path + "</p>";
        resolve({ html: html });
    });
});


/***/ }),

/***/ "./node_modules/aspnet-prerendering/Prerendering.js":
/*!**********************************************************!*\
  !*** ./node_modules/aspnet-prerendering/Prerendering.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var url = __webpack_require__(/*! url */ "url");
var domain = __webpack_require__(/*! domain */ "domain");
var main_1 = __webpack_require__(/*! domain-task/main */ "./node_modules/domain-task/main.js");
var defaultTimeoutMilliseconds = 30 * 1000;
function createServerRenderer(bootFunc) {
    var resultFunc = function (callback, applicationBasePath, bootModule, absoluteRequestUrl, requestPathAndQuery, customDataParameter, overrideTimeoutMilliseconds, requestPathBase) {
        // Prepare a promise that will represent the completion of all domain tasks in this execution context.
        // The boot code will wait for this before performing its final render.
        var domainTaskCompletionPromiseResolve;
        var domainTaskCompletionPromise = new Promise(function (resolve, reject) {
            domainTaskCompletionPromiseResolve = resolve;
        });
        var parsedAbsoluteRequestUrl = url.parse(absoluteRequestUrl);
        var params = {
            // It's helpful for boot funcs to receive the query as a key-value object, so parse it here
            // e.g., react-redux-router requires location.query to be a key-value object for consistency with client-side behaviour
            location: url.parse(requestPathAndQuery, /* parseQueryString */ true),
            origin: parsedAbsoluteRequestUrl.protocol + '//' + parsedAbsoluteRequestUrl.host,
            url: requestPathAndQuery,
            baseUrl: (requestPathBase || '') + '/',
            absoluteUrl: absoluteRequestUrl,
            domainTasks: domainTaskCompletionPromise,
            data: customDataParameter
        };
        var absoluteBaseUrl = params.origin + params.baseUrl; // Should be same value as page's <base href>
        // Open a new domain that can track all the async tasks involved in the app's execution
        main_1.run(/* code to run */ function () {
            // Workaround for Node bug where native Promise continuations lose their domain context
            // (https://github.com/nodejs/node-v0.x-archive/issues/8648)
            // The domain.active property is set by the domain-context module
            bindPromiseContinuationsToDomain(domainTaskCompletionPromise, domain['active']);
            // Make the base URL available to the 'domain-tasks/fetch' helper within this execution context
            main_1.baseUrl(absoluteBaseUrl);
            // Begin rendering, and apply a timeout
            var bootFuncPromise = bootFunc(params);
            if (!bootFuncPromise || typeof bootFuncPromise.then !== 'function') {
                callback("Prerendering failed because the boot function in " + bootModule.moduleName + " did not return a promise.", null);
                return;
            }
            var timeoutMilliseconds = overrideTimeoutMilliseconds || defaultTimeoutMilliseconds; // e.g., pass -1 to override as 'never time out'
            var bootFuncPromiseWithTimeout = timeoutMilliseconds > 0
                ? wrapWithTimeout(bootFuncPromise, timeoutMilliseconds, "Prerendering timed out after " + timeoutMilliseconds + "ms because the boot function in '" + bootModule.moduleName + "' "
                    + 'returned a promise that did not resolve or reject. Make sure that your boot function always resolves or '
                    + 'rejects its promise. You can change the timeout value using the \'asp-prerender-timeout\' tag helper.')
                : bootFuncPromise;
            // Actually perform the rendering
            bootFuncPromiseWithTimeout.then(function (successResult) {
                callback(null, successResult);
            }, function (error) {
                callback(error, null);
            });
        }, /* completion callback */ function (/* completion callback */ errorOrNothing) {
            if (errorOrNothing) {
                callback(errorOrNothing, null);
            }
            else {
                // There are no more ongoing domain tasks (typically data access operations), so we can resolve
                // the domain tasks promise which notifies the boot code that it can do its final render.
                domainTaskCompletionPromiseResolve();
            }
        });
    };
    // Indicate to the prerendering code bundled into Microsoft.AspNetCore.SpaServices that this is a serverside rendering
    // function, so it can be invoked directly. This flag exists only so that, in its absence, we can run some different
    // backward-compatibility logic.
    resultFunc['isServerRenderer'] = true;
    return resultFunc;
}
exports.createServerRenderer = createServerRenderer;
function wrapWithTimeout(promise, timeoutMilliseconds, timeoutRejectionValue) {
    return new Promise(function (resolve, reject) {
        var timeoutTimer = setTimeout(function () {
            reject(timeoutRejectionValue);
        }, timeoutMilliseconds);
        promise.then(function (resolvedValue) {
            clearTimeout(timeoutTimer);
            resolve(resolvedValue);
        }, function (rejectedValue) {
            clearTimeout(timeoutTimer);
            reject(rejectedValue);
        });
    });
}
function bindPromiseContinuationsToDomain(promise, domainInstance) {
    var originalThen = promise.then;
    promise.then = (function then(resolve, reject) {
        if (typeof resolve === 'function') {
            resolve = domainInstance.bind(resolve);
        }
        if (typeof reject === 'function') {
            reject = domainInstance.bind(reject);
        }
        return originalThen.call(this, resolve, reject);
    });
}


/***/ }),

/***/ "./node_modules/aspnet-prerendering/index.js":
/*!***************************************************!*\
  !*** ./node_modules/aspnet-prerendering/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Prerendering */ "./node_modules/aspnet-prerendering/Prerendering.js"));


/***/ }),

/***/ "./node_modules/domain-context/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/domain-context/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.6.2
var domain;

domain = __webpack_require__(/*! domain */ "domain");

exports.context = function(context, currentDomain) {
  if (currentDomain == null) {
    currentDomain = domain.active;
  }
  if (currentDomain == null) {
    throw new Error('no active domain');
  }
  return currentDomain.__context__ = context != null ? context() : {};
};

exports.cleanup = function(cleanup, context, currentDomain) {
  if (context == null) {
    context = null;
  }
  if (currentDomain == null) {
    currentDomain = domain.active;
  }
  context = context || currentDomain.__context__;
  if ((cleanup != null) && (context != null)) {
    cleanup(context);
  }
  if (currentDomain != null) {
    return currentDomain.__context__ = null;
  }
};

exports.onError = function(err, onError, context, currentDomain) {
  if (context == null) {
    context = null;
  }
  if (currentDomain == null) {
    currentDomain = domain.active;
  }
  context = context || currentDomain.__context__;
  if (onError != null) {
    onError(err, context);
  }
  return currentDomain.__context__ = null;
};

exports.get = function(key, currentDomain) {
  if (currentDomain == null) {
    currentDomain = domain.active;
  }
  if (currentDomain == null) {
    throw new Error('no active domain');
  }
  return currentDomain.__context__[key];
};

exports.set = function(key, value, currentDomain) {
  if (currentDomain == null) {
    currentDomain = domain.active;
  }
  if (currentDomain == null) {
    throw new Error('no active domain');
  }
  return currentDomain.__context__[key] = value;
};

exports.run = function(options, func) {
  var cleanup, context, currentDomain, err, onError;

  if (!func) {
    func = options;
    options = {};
  }
  context = options.context, cleanup = options.cleanup, onError = options.onError;
  currentDomain = options.domain || domain.active;
  if (!currentDomain) {
    throw new Error('no active domain');
  }
  currentDomain.on('dispose', function() {
    return exports.cleanup(cleanup, null, currentDomain);
  });
  currentDomain.on('error', function(err) {
    if (onError != null) {
      return exports.onError(err, onError, null, currentDomain);
    } else {
      return exports.cleanup(cleanup, null, currentDomain);
    }
  });
  exports.context(context, currentDomain);
  try {
    currentDomain.bind(func, true)();
  } catch (_error) {
    err = _error;
    currentDomain.emit('error', err);
  }
  return currentDomain;
};

exports.runInNewDomain = function(options, func) {
  var currentDomain;

  if (!func) {
    func = options;
    options = {};
  }
  currentDomain = domain.active;
  options.domain = domain.create();
  if (!options.detach && currentDomain) {
    currentDomain.add(options.domain);
    options.domain.on('error', function(err) {
      return currentDomain.emit('error', err);
    });
    currentDomain.on('dispose', function() {
      return options.domain.dispose();
    });
  }
  return exports.run(options, func);
};

exports.middleware = function(context, cleanup) {
  return function(req, res, next) {
    var currentDomain, _ref;

    if (typeof context !== 'function') {
      _ref = context, context = _ref.context, cleanup = _ref.cleanup;
    }
    currentDomain = domain.active;
    exports.context(context, currentDomain);
    res.on('finish', function() {
      return exports.cleanup(cleanup, null, currentDomain);
    });
    req.__context__ = currentDomain.__context__;
    return next();
  };
};

exports.middlewareOnError = function(onError) {
  return function(err, req, res, next) {
    if (typeof onError !== 'function') {
      onError = onError.onError;
    }
    if (onError != null) {
      exports.onError(err, onError, req.__context__);
    } else {
      exports.cleanup(onError, req.__context__);
    }
    req.__context__ = null;
    return next(err);
  };
};


/***/ }),

/***/ "./node_modules/domain-task/main.js":
/*!******************************************!*\
  !*** ./node_modules/domain-task/main.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var domain = __webpack_require__(/*! domain */ "domain");
var domainContext = __webpack_require__(/*! domain-context */ "./node_modules/domain-context/lib/index.js");
// Not using symbols, because this may need to run in a version of Node.js that doesn't support them
var domainTasksStateKey = '__DOMAIN_TASKS';
var domainTaskBaseUrlStateKey = '__DOMAIN_TASK_INTERNAL_FETCH_BASEURL__DO_NOT_REFERENCE_THIS__';
var noDomainBaseUrl;
function addTask(task) {
    if (task && domain.active) {
        var state_1 = domainContext.get(domainTasksStateKey);
        if (state_1) {
            state_1.numRemainingTasks++;
            task.then(function () {
                // The application may have other listeners chained to this promise *after*
                // this listener, which may in turn register further tasks. Since we don't 
                // want the combined task to complete until all the handlers for child tasks
                // have finished, delay the response to give time for more tasks to be added
                // synchronously.
                setTimeout(function () {
                    state_1.numRemainingTasks--;
                    if (state_1.numRemainingTasks === 0 && !state_1.hasIssuedSuccessCallback) {
                        state_1.hasIssuedSuccessCallback = true;
                        setTimeout(function () {
                            state_1.completionCallback(/* error */ null);
                        }, 0);
                    }
                }, 0);
            }, function (error) {
                state_1.completionCallback(error);
            });
        }
    }
}
exports.addTask = addTask;
function run(codeToRun, completionCallback) {
    var synchronousResult;
    domainContext.runInNewDomain(function () {
        var state = {
            numRemainingTasks: 0,
            hasIssuedSuccessCallback: false,
            completionCallback: domain.active.bind(completionCallback)
        };
        try {
            domainContext.set(domainTasksStateKey, state);
            synchronousResult = codeToRun();
            // If no tasks were registered synchronously, then we're done already
            if (state.numRemainingTasks === 0 && !state.hasIssuedSuccessCallback) {
                state.hasIssuedSuccessCallback = true;
                setTimeout(function () {
                    state.completionCallback(/* error */ null);
                }, 0);
            }
        }
        catch (ex) {
            state.completionCallback(ex);
        }
    });
    return synchronousResult;
}
exports.run = run;
function baseUrl(url) {
    if (url) {
        if (domain.active) {
            // There's an active domain (e.g., in Node.js), so associate the base URL with it
            domainContext.set(domainTaskBaseUrlStateKey, url);
        }
        else {
            // There's no active domain (e.g., in browser), so there's just one shared base URL
            noDomainBaseUrl = url;
        }
    }
    return domain.active ? domainContext.get(domainTaskBaseUrlStateKey) : noDomainBaseUrl;
}
exports.baseUrl = baseUrl;


/***/ }),

/***/ "domain":
/*!*************************!*\
  !*** external "domain" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("domain");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ })));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hc3BuZXQtcHJlcmVuZGVyaW5nL1ByZXJlbmRlcmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZG9tYWluLWNvbnRleHQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9tYWluLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImRvbWFpblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSwwSEFBeUQ7QUFFekQsa0JBQWUsMENBQW9CLENBQUMsZ0JBQU07SUFDckMsV0FBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtRQUM5QixJQUFNLElBQUksR0FBRywwRUFDZSxJQUFJLElBQUksRUFBRSxtQ0FDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLGtDQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGlDQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksU0FBTyxDQUFDO1FBRXRDLE9BQU8sQ0FBQyxFQUFDLElBQUksUUFBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDO0FBUkYsQ0FRRSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNYVDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnR0FBZ0c7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BKQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxRUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsZ0MiLCJmaWxlIjoiYm9vdC1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL0NsaWVudEFwcC9ib290LXNlcnZlci50c1wiKTtcbiIsImltcG9ydCB7IGNyZWF0ZVNlcnZlclJlbmRlcmVyfSBmcm9tICdhc3BuZXQtcHJlcmVuZGVyaW5nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2VydmVyUmVuZGVyZXIocGFyYW1zID0+IFxyXG4gICAgIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICBjb25zdCBodG1sID0gYDxoMT5IZWxsbywgV29ybGQgZnJvbSBKUyE8L2gxPlxyXG4gICAgICAgICAgICA8cD5DdXJyZW50IHRpbWUgaW4gbm9kZTogJHsgbmV3IERhdGUoKX0gPC9wPlxyXG4gICAgICAgICAgICA8cD5kYXRhOiR7cGFyYW1zLmRhdGEuaXNBZG1pbmlzdHJhdG9yIH08L3A+XHJcbiAgICAgICAgICAgIDxwPmRhdGE6JHtwYXJhbXMuZGF0YS5jb29raWVzWzJdLmtleX08L3A+XHJcbiAgICAgICAgICAgIDxwPlVSTDokeyBwYXJhbXMubG9jYXRpb24ucGF0aCB9PC9wPmA7XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKHtodG1sfSk7XHJcbiAgICAgfSkpOyIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciB1cmwgPSByZXF1aXJlKFwidXJsXCIpO1xyXG52YXIgZG9tYWluID0gcmVxdWlyZShcImRvbWFpblwiKTtcclxudmFyIG1haW5fMSA9IHJlcXVpcmUoXCJkb21haW4tdGFzay9tYWluXCIpO1xyXG52YXIgZGVmYXVsdFRpbWVvdXRNaWxsaXNlY29uZHMgPSAzMCAqIDEwMDA7XHJcbmZ1bmN0aW9uIGNyZWF0ZVNlcnZlclJlbmRlcmVyKGJvb3RGdW5jKSB7XHJcbiAgICB2YXIgcmVzdWx0RnVuYyA9IGZ1bmN0aW9uIChjYWxsYmFjaywgYXBwbGljYXRpb25CYXNlUGF0aCwgYm9vdE1vZHVsZSwgYWJzb2x1dGVSZXF1ZXN0VXJsLCByZXF1ZXN0UGF0aEFuZFF1ZXJ5LCBjdXN0b21EYXRhUGFyYW1ldGVyLCBvdmVycmlkZVRpbWVvdXRNaWxsaXNlY29uZHMsIHJlcXVlc3RQYXRoQmFzZSkge1xyXG4gICAgICAgIC8vIFByZXBhcmUgYSBwcm9taXNlIHRoYXQgd2lsbCByZXByZXNlbnQgdGhlIGNvbXBsZXRpb24gb2YgYWxsIGRvbWFpbiB0YXNrcyBpbiB0aGlzIGV4ZWN1dGlvbiBjb250ZXh0LlxyXG4gICAgICAgIC8vIFRoZSBib290IGNvZGUgd2lsbCB3YWl0IGZvciB0aGlzIGJlZm9yZSBwZXJmb3JtaW5nIGl0cyBmaW5hbCByZW5kZXIuXHJcbiAgICAgICAgdmFyIGRvbWFpblRhc2tDb21wbGV0aW9uUHJvbWlzZVJlc29sdmU7XHJcbiAgICAgICAgdmFyIGRvbWFpblRhc2tDb21wbGV0aW9uUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgZG9tYWluVGFza0NvbXBsZXRpb25Qcm9taXNlUmVzb2x2ZSA9IHJlc29sdmU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHBhcnNlZEFic29sdXRlUmVxdWVzdFVybCA9IHVybC5wYXJzZShhYnNvbHV0ZVJlcXVlc3RVcmwpO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIC8vIEl0J3MgaGVscGZ1bCBmb3IgYm9vdCBmdW5jcyB0byByZWNlaXZlIHRoZSBxdWVyeSBhcyBhIGtleS12YWx1ZSBvYmplY3QsIHNvIHBhcnNlIGl0IGhlcmVcclxuICAgICAgICAgICAgLy8gZS5nLiwgcmVhY3QtcmVkdXgtcm91dGVyIHJlcXVpcmVzIGxvY2F0aW9uLnF1ZXJ5IHRvIGJlIGEga2V5LXZhbHVlIG9iamVjdCBmb3IgY29uc2lzdGVuY3kgd2l0aCBjbGllbnQtc2lkZSBiZWhhdmlvdXJcclxuICAgICAgICAgICAgbG9jYXRpb246IHVybC5wYXJzZShyZXF1ZXN0UGF0aEFuZFF1ZXJ5LCAvKiBwYXJzZVF1ZXJ5U3RyaW5nICovIHRydWUpLFxyXG4gICAgICAgICAgICBvcmlnaW46IHBhcnNlZEFic29sdXRlUmVxdWVzdFVybC5wcm90b2NvbCArICcvLycgKyBwYXJzZWRBYnNvbHV0ZVJlcXVlc3RVcmwuaG9zdCxcclxuICAgICAgICAgICAgdXJsOiByZXF1ZXN0UGF0aEFuZFF1ZXJ5LFxyXG4gICAgICAgICAgICBiYXNlVXJsOiAocmVxdWVzdFBhdGhCYXNlIHx8ICcnKSArICcvJyxcclxuICAgICAgICAgICAgYWJzb2x1dGVVcmw6IGFic29sdXRlUmVxdWVzdFVybCxcclxuICAgICAgICAgICAgZG9tYWluVGFza3M6IGRvbWFpblRhc2tDb21wbGV0aW9uUHJvbWlzZSxcclxuICAgICAgICAgICAgZGF0YTogY3VzdG9tRGF0YVBhcmFtZXRlclxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGFic29sdXRlQmFzZVVybCA9IHBhcmFtcy5vcmlnaW4gKyBwYXJhbXMuYmFzZVVybDsgLy8gU2hvdWxkIGJlIHNhbWUgdmFsdWUgYXMgcGFnZSdzIDxiYXNlIGhyZWY+XHJcbiAgICAgICAgLy8gT3BlbiBhIG5ldyBkb21haW4gdGhhdCBjYW4gdHJhY2sgYWxsIHRoZSBhc3luYyB0YXNrcyBpbnZvbHZlZCBpbiB0aGUgYXBwJ3MgZXhlY3V0aW9uXHJcbiAgICAgICAgbWFpbl8xLnJ1bigvKiBjb2RlIHRvIHJ1biAqLyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZm9yIE5vZGUgYnVnIHdoZXJlIG5hdGl2ZSBQcm9taXNlIGNvbnRpbnVhdGlvbnMgbG9zZSB0aGVpciBkb21haW4gY29udGV4dFxyXG4gICAgICAgICAgICAvLyAoaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlLXYwLngtYXJjaGl2ZS9pc3N1ZXMvODY0OClcclxuICAgICAgICAgICAgLy8gVGhlIGRvbWFpbi5hY3RpdmUgcHJvcGVydHkgaXMgc2V0IGJ5IHRoZSBkb21haW4tY29udGV4dCBtb2R1bGVcclxuICAgICAgICAgICAgYmluZFByb21pc2VDb250aW51YXRpb25zVG9Eb21haW4oZG9tYWluVGFza0NvbXBsZXRpb25Qcm9taXNlLCBkb21haW5bJ2FjdGl2ZSddKTtcclxuICAgICAgICAgICAgLy8gTWFrZSB0aGUgYmFzZSBVUkwgYXZhaWxhYmxlIHRvIHRoZSAnZG9tYWluLXRhc2tzL2ZldGNoJyBoZWxwZXIgd2l0aGluIHRoaXMgZXhlY3V0aW9uIGNvbnRleHRcclxuICAgICAgICAgICAgbWFpbl8xLmJhc2VVcmwoYWJzb2x1dGVCYXNlVXJsKTtcclxuICAgICAgICAgICAgLy8gQmVnaW4gcmVuZGVyaW5nLCBhbmQgYXBwbHkgYSB0aW1lb3V0XHJcbiAgICAgICAgICAgIHZhciBib290RnVuY1Byb21pc2UgPSBib290RnVuYyhwYXJhbXMpO1xyXG4gICAgICAgICAgICBpZiAoIWJvb3RGdW5jUHJvbWlzZSB8fCB0eXBlb2YgYm9vdEZ1bmNQcm9taXNlLnRoZW4gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKFwiUHJlcmVuZGVyaW5nIGZhaWxlZCBiZWNhdXNlIHRoZSBib290IGZ1bmN0aW9uIGluIFwiICsgYm9vdE1vZHVsZS5tb2R1bGVOYW1lICsgXCIgZGlkIG5vdCByZXR1cm4gYSBwcm9taXNlLlwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGltZW91dE1pbGxpc2Vjb25kcyA9IG92ZXJyaWRlVGltZW91dE1pbGxpc2Vjb25kcyB8fCBkZWZhdWx0VGltZW91dE1pbGxpc2Vjb25kczsgLy8gZS5nLiwgcGFzcyAtMSB0byBvdmVycmlkZSBhcyAnbmV2ZXIgdGltZSBvdXQnXHJcbiAgICAgICAgICAgIHZhciBib290RnVuY1Byb21pc2VXaXRoVGltZW91dCA9IHRpbWVvdXRNaWxsaXNlY29uZHMgPiAwXHJcbiAgICAgICAgICAgICAgICA/IHdyYXBXaXRoVGltZW91dChib290RnVuY1Byb21pc2UsIHRpbWVvdXRNaWxsaXNlY29uZHMsIFwiUHJlcmVuZGVyaW5nIHRpbWVkIG91dCBhZnRlciBcIiArIHRpbWVvdXRNaWxsaXNlY29uZHMgKyBcIm1zIGJlY2F1c2UgdGhlIGJvb3QgZnVuY3Rpb24gaW4gJ1wiICsgYm9vdE1vZHVsZS5tb2R1bGVOYW1lICsgXCInIFwiXHJcbiAgICAgICAgICAgICAgICAgICAgKyAncmV0dXJuZWQgYSBwcm9taXNlIHRoYXQgZGlkIG5vdCByZXNvbHZlIG9yIHJlamVjdC4gTWFrZSBzdXJlIHRoYXQgeW91ciBib290IGZ1bmN0aW9uIGFsd2F5cyByZXNvbHZlcyBvciAnXHJcbiAgICAgICAgICAgICAgICAgICAgKyAncmVqZWN0cyBpdHMgcHJvbWlzZS4gWW91IGNhbiBjaGFuZ2UgdGhlIHRpbWVvdXQgdmFsdWUgdXNpbmcgdGhlIFxcJ2FzcC1wcmVyZW5kZXItdGltZW91dFxcJyB0YWcgaGVscGVyLicpXHJcbiAgICAgICAgICAgICAgICA6IGJvb3RGdW5jUHJvbWlzZTtcclxuICAgICAgICAgICAgLy8gQWN0dWFsbHkgcGVyZm9ybSB0aGUgcmVuZGVyaW5nXHJcbiAgICAgICAgICAgIGJvb3RGdW5jUHJvbWlzZVdpdGhUaW1lb3V0LnRoZW4oZnVuY3Rpb24gKHN1Y2Nlc3NSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHN1Y2Nlc3NSZXN1bHQpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgLyogY29tcGxldGlvbiBjYWxsYmFjayAqLyBmdW5jdGlvbiAoLyogY29tcGxldGlvbiBjYWxsYmFjayAqLyBlcnJvck9yTm90aGluZykge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3JPck5vdGhpbmcpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yT3JOb3RoaW5nLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZXJlIGFyZSBubyBtb3JlIG9uZ29pbmcgZG9tYWluIHRhc2tzICh0eXBpY2FsbHkgZGF0YSBhY2Nlc3Mgb3BlcmF0aW9ucyksIHNvIHdlIGNhbiByZXNvbHZlXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgZG9tYWluIHRhc2tzIHByb21pc2Ugd2hpY2ggbm90aWZpZXMgdGhlIGJvb3QgY29kZSB0aGF0IGl0IGNhbiBkbyBpdHMgZmluYWwgcmVuZGVyLlxyXG4gICAgICAgICAgICAgICAgZG9tYWluVGFza0NvbXBsZXRpb25Qcm9taXNlUmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLy8gSW5kaWNhdGUgdG8gdGhlIHByZXJlbmRlcmluZyBjb2RlIGJ1bmRsZWQgaW50byBNaWNyb3NvZnQuQXNwTmV0Q29yZS5TcGFTZXJ2aWNlcyB0aGF0IHRoaXMgaXMgYSBzZXJ2ZXJzaWRlIHJlbmRlcmluZ1xyXG4gICAgLy8gZnVuY3Rpb24sIHNvIGl0IGNhbiBiZSBpbnZva2VkIGRpcmVjdGx5LiBUaGlzIGZsYWcgZXhpc3RzIG9ubHkgc28gdGhhdCwgaW4gaXRzIGFic2VuY2UsIHdlIGNhbiBydW4gc29tZSBkaWZmZXJlbnRcclxuICAgIC8vIGJhY2t3YXJkLWNvbXBhdGliaWxpdHkgbG9naWMuXHJcbiAgICByZXN1bHRGdW5jWydpc1NlcnZlclJlbmRlcmVyJ10gPSB0cnVlO1xyXG4gICAgcmV0dXJuIHJlc3VsdEZ1bmM7XHJcbn1cclxuZXhwb3J0cy5jcmVhdGVTZXJ2ZXJSZW5kZXJlciA9IGNyZWF0ZVNlcnZlclJlbmRlcmVyO1xyXG5mdW5jdGlvbiB3cmFwV2l0aFRpbWVvdXQocHJvbWlzZSwgdGltZW91dE1pbGxpc2Vjb25kcywgdGltZW91dFJlamVjdGlvblZhbHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciB0aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVqZWN0KHRpbWVvdXRSZWplY3Rpb25WYWx1ZSk7XHJcbiAgICAgICAgfSwgdGltZW91dE1pbGxpc2Vjb25kcyk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXNvbHZlZFZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc29sdmVkVmFsdWUpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZWplY3RlZFZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpO1xyXG4gICAgICAgICAgICByZWplY3QocmVqZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBiaW5kUHJvbWlzZUNvbnRpbnVhdGlvbnNUb0RvbWFpbihwcm9taXNlLCBkb21haW5JbnN0YW5jZSkge1xyXG4gICAgdmFyIG9yaWdpbmFsVGhlbiA9IHByb21pc2UudGhlbjtcclxuICAgIHByb21pc2UudGhlbiA9IChmdW5jdGlvbiB0aGVuKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzb2x2ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXNvbHZlID0gZG9tYWluSW5zdGFuY2UuYmluZChyZXNvbHZlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiByZWplY3QgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmVqZWN0ID0gZG9tYWluSW5zdGFuY2UuYmluZChyZWplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3JpZ2luYWxUaGVuLmNhbGwodGhpcywgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgIH0pO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5fX2V4cG9ydChyZXF1aXJlKFwiLi9QcmVyZW5kZXJpbmdcIikpO1xyXG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNi4yXG52YXIgZG9tYWluO1xuXG5kb21haW4gPSByZXF1aXJlKCdkb21haW4nKTtcblxuZXhwb3J0cy5jb250ZXh0ID0gZnVuY3Rpb24oY29udGV4dCwgY3VycmVudERvbWFpbikge1xuICBpZiAoY3VycmVudERvbWFpbiA9PSBudWxsKSB7XG4gICAgY3VycmVudERvbWFpbiA9IGRvbWFpbi5hY3RpdmU7XG4gIH1cbiAgaWYgKGN1cnJlbnREb21haW4gPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbm8gYWN0aXZlIGRvbWFpbicpO1xuICB9XG4gIHJldHVybiBjdXJyZW50RG9tYWluLl9fY29udGV4dF9fID0gY29udGV4dCAhPSBudWxsID8gY29udGV4dCgpIDoge307XG59O1xuXG5leHBvcnRzLmNsZWFudXAgPSBmdW5jdGlvbihjbGVhbnVwLCBjb250ZXh0LCBjdXJyZW50RG9tYWluKSB7XG4gIGlmIChjb250ZXh0ID09IG51bGwpIHtcbiAgICBjb250ZXh0ID0gbnVsbDtcbiAgfVxuICBpZiAoY3VycmVudERvbWFpbiA9PSBudWxsKSB7XG4gICAgY3VycmVudERvbWFpbiA9IGRvbWFpbi5hY3RpdmU7XG4gIH1cbiAgY29udGV4dCA9IGNvbnRleHQgfHwgY3VycmVudERvbWFpbi5fX2NvbnRleHRfXztcbiAgaWYgKChjbGVhbnVwICE9IG51bGwpICYmIChjb250ZXh0ICE9IG51bGwpKSB7XG4gICAgY2xlYW51cChjb250ZXh0KTtcbiAgfVxuICBpZiAoY3VycmVudERvbWFpbiAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGN1cnJlbnREb21haW4uX19jb250ZXh0X18gPSBudWxsO1xuICB9XG59O1xuXG5leHBvcnRzLm9uRXJyb3IgPSBmdW5jdGlvbihlcnIsIG9uRXJyb3IsIGNvbnRleHQsIGN1cnJlbnREb21haW4pIHtcbiAgaWYgKGNvbnRleHQgPT0gbnVsbCkge1xuICAgIGNvbnRleHQgPSBudWxsO1xuICB9XG4gIGlmIChjdXJyZW50RG9tYWluID09IG51bGwpIHtcbiAgICBjdXJyZW50RG9tYWluID0gZG9tYWluLmFjdGl2ZTtcbiAgfVxuICBjb250ZXh0ID0gY29udGV4dCB8fCBjdXJyZW50RG9tYWluLl9fY29udGV4dF9fO1xuICBpZiAob25FcnJvciAhPSBudWxsKSB7XG4gICAgb25FcnJvcihlcnIsIGNvbnRleHQpO1xuICB9XG4gIHJldHVybiBjdXJyZW50RG9tYWluLl9fY29udGV4dF9fID0gbnVsbDtcbn07XG5cbmV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24oa2V5LCBjdXJyZW50RG9tYWluKSB7XG4gIGlmIChjdXJyZW50RG9tYWluID09IG51bGwpIHtcbiAgICBjdXJyZW50RG9tYWluID0gZG9tYWluLmFjdGl2ZTtcbiAgfVxuICBpZiAoY3VycmVudERvbWFpbiA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdubyBhY3RpdmUgZG9tYWluJyk7XG4gIH1cbiAgcmV0dXJuIGN1cnJlbnREb21haW4uX19jb250ZXh0X19ba2V5XTtcbn07XG5cbmV4cG9ydHMuc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSwgY3VycmVudERvbWFpbikge1xuICBpZiAoY3VycmVudERvbWFpbiA9PSBudWxsKSB7XG4gICAgY3VycmVudERvbWFpbiA9IGRvbWFpbi5hY3RpdmU7XG4gIH1cbiAgaWYgKGN1cnJlbnREb21haW4gPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignbm8gYWN0aXZlIGRvbWFpbicpO1xuICB9XG4gIHJldHVybiBjdXJyZW50RG9tYWluLl9fY29udGV4dF9fW2tleV0gPSB2YWx1ZTtcbn07XG5cbmV4cG9ydHMucnVuID0gZnVuY3Rpb24ob3B0aW9ucywgZnVuYykge1xuICB2YXIgY2xlYW51cCwgY29udGV4dCwgY3VycmVudERvbWFpbiwgZXJyLCBvbkVycm9yO1xuXG4gIGlmICghZnVuYykge1xuICAgIGZ1bmMgPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBjb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0LCBjbGVhbnVwID0gb3B0aW9ucy5jbGVhbnVwLCBvbkVycm9yID0gb3B0aW9ucy5vbkVycm9yO1xuICBjdXJyZW50RG9tYWluID0gb3B0aW9ucy5kb21haW4gfHwgZG9tYWluLmFjdGl2ZTtcbiAgaWYgKCFjdXJyZW50RG9tYWluKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdubyBhY3RpdmUgZG9tYWluJyk7XG4gIH1cbiAgY3VycmVudERvbWFpbi5vbignZGlzcG9zZScsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBleHBvcnRzLmNsZWFudXAoY2xlYW51cCwgbnVsbCwgY3VycmVudERvbWFpbik7XG4gIH0pO1xuICBjdXJyZW50RG9tYWluLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycikge1xuICAgIGlmIChvbkVycm9yICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLm9uRXJyb3IoZXJyLCBvbkVycm9yLCBudWxsLCBjdXJyZW50RG9tYWluKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuY2xlYW51cChjbGVhbnVwLCBudWxsLCBjdXJyZW50RG9tYWluKTtcbiAgICB9XG4gIH0pO1xuICBleHBvcnRzLmNvbnRleHQoY29udGV4dCwgY3VycmVudERvbWFpbik7XG4gIHRyeSB7XG4gICAgY3VycmVudERvbWFpbi5iaW5kKGZ1bmMsIHRydWUpKCk7XG4gIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgIGVyciA9IF9lcnJvcjtcbiAgICBjdXJyZW50RG9tYWluLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxuICByZXR1cm4gY3VycmVudERvbWFpbjtcbn07XG5cbmV4cG9ydHMucnVuSW5OZXdEb21haW4gPSBmdW5jdGlvbihvcHRpb25zLCBmdW5jKSB7XG4gIHZhciBjdXJyZW50RG9tYWluO1xuXG4gIGlmICghZnVuYykge1xuICAgIGZ1bmMgPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBjdXJyZW50RG9tYWluID0gZG9tYWluLmFjdGl2ZTtcbiAgb3B0aW9ucy5kb21haW4gPSBkb21haW4uY3JlYXRlKCk7XG4gIGlmICghb3B0aW9ucy5kZXRhY2ggJiYgY3VycmVudERvbWFpbikge1xuICAgIGN1cnJlbnREb21haW4uYWRkKG9wdGlvbnMuZG9tYWluKTtcbiAgICBvcHRpb25zLmRvbWFpbi5vbignZXJyb3InLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIHJldHVybiBjdXJyZW50RG9tYWluLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICB9KTtcbiAgICBjdXJyZW50RG9tYWluLm9uKCdkaXNwb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5kb21haW4uZGlzcG9zZSgpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBleHBvcnRzLnJ1bihvcHRpb25zLCBmdW5jKTtcbn07XG5cbmV4cG9ydHMubWlkZGxld2FyZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGNsZWFudXApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgdmFyIGN1cnJlbnREb21haW4sIF9yZWY7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIF9yZWYgPSBjb250ZXh0LCBjb250ZXh0ID0gX3JlZi5jb250ZXh0LCBjbGVhbnVwID0gX3JlZi5jbGVhbnVwO1xuICAgIH1cbiAgICBjdXJyZW50RG9tYWluID0gZG9tYWluLmFjdGl2ZTtcbiAgICBleHBvcnRzLmNvbnRleHQoY29udGV4dCwgY3VycmVudERvbWFpbik7XG4gICAgcmVzLm9uKCdmaW5pc2gnLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmNsZWFudXAoY2xlYW51cCwgbnVsbCwgY3VycmVudERvbWFpbik7XG4gICAgfSk7XG4gICAgcmVxLl9fY29udGV4dF9fID0gY3VycmVudERvbWFpbi5fX2NvbnRleHRfXztcbiAgICByZXR1cm4gbmV4dCgpO1xuICB9O1xufTtcblxuZXhwb3J0cy5taWRkbGV3YXJlT25FcnJvciA9IGZ1bmN0aW9uKG9uRXJyb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpIHtcbiAgICBpZiAodHlwZW9mIG9uRXJyb3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9uRXJyb3IgPSBvbkVycm9yLm9uRXJyb3I7XG4gICAgfVxuICAgIGlmIChvbkVycm9yICE9IG51bGwpIHtcbiAgICAgIGV4cG9ydHMub25FcnJvcihlcnIsIG9uRXJyb3IsIHJlcS5fX2NvbnRleHRfXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuY2xlYW51cChvbkVycm9yLCByZXEuX19jb250ZXh0X18pO1xuICAgIH1cbiAgICByZXEuX19jb250ZXh0X18gPSBudWxsO1xuICAgIHJldHVybiBuZXh0KGVycik7XG4gIH07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGRvbWFpbiA9IHJlcXVpcmUoXCJkb21haW5cIik7XHJcbnZhciBkb21haW5Db250ZXh0ID0gcmVxdWlyZShcImRvbWFpbi1jb250ZXh0XCIpO1xyXG4vLyBOb3QgdXNpbmcgc3ltYm9scywgYmVjYXVzZSB0aGlzIG1heSBuZWVkIHRvIHJ1biBpbiBhIHZlcnNpb24gb2YgTm9kZS5qcyB0aGF0IGRvZXNuJ3Qgc3VwcG9ydCB0aGVtXHJcbnZhciBkb21haW5UYXNrc1N0YXRlS2V5ID0gJ19fRE9NQUlOX1RBU0tTJztcclxudmFyIGRvbWFpblRhc2tCYXNlVXJsU3RhdGVLZXkgPSAnX19ET01BSU5fVEFTS19JTlRFUk5BTF9GRVRDSF9CQVNFVVJMX19ET19OT1RfUkVGRVJFTkNFX1RISVNfXyc7XHJcbnZhciBub0RvbWFpbkJhc2VVcmw7XHJcbmZ1bmN0aW9uIGFkZFRhc2sodGFzaykge1xyXG4gICAgaWYgKHRhc2sgJiYgZG9tYWluLmFjdGl2ZSkge1xyXG4gICAgICAgIHZhciBzdGF0ZV8xID0gZG9tYWluQ29udGV4dC5nZXQoZG9tYWluVGFza3NTdGF0ZUtleSk7XHJcbiAgICAgICAgaWYgKHN0YXRlXzEpIHtcclxuICAgICAgICAgICAgc3RhdGVfMS5udW1SZW1haW5pbmdUYXNrcysrO1xyXG4gICAgICAgICAgICB0YXNrLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGFwcGxpY2F0aW9uIG1heSBoYXZlIG90aGVyIGxpc3RlbmVycyBjaGFpbmVkIHRvIHRoaXMgcHJvbWlzZSAqYWZ0ZXIqXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGxpc3RlbmVyLCB3aGljaCBtYXkgaW4gdHVybiByZWdpc3RlciBmdXJ0aGVyIHRhc2tzLiBTaW5jZSB3ZSBkb24ndCBcclxuICAgICAgICAgICAgICAgIC8vIHdhbnQgdGhlIGNvbWJpbmVkIHRhc2sgdG8gY29tcGxldGUgdW50aWwgYWxsIHRoZSBoYW5kbGVycyBmb3IgY2hpbGQgdGFza3NcclxuICAgICAgICAgICAgICAgIC8vIGhhdmUgZmluaXNoZWQsIGRlbGF5IHRoZSByZXNwb25zZSB0byBnaXZlIHRpbWUgZm9yIG1vcmUgdGFza3MgdG8gYmUgYWRkZWRcclxuICAgICAgICAgICAgICAgIC8vIHN5bmNocm9ub3VzbHkuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZV8xLm51bVJlbWFpbmluZ1Rhc2tzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlXzEubnVtUmVtYWluaW5nVGFza3MgPT09IDAgJiYgIXN0YXRlXzEuaGFzSXNzdWVkU3VjY2Vzc0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlXzEuaGFzSXNzdWVkU3VjY2Vzc0NhbGxiYWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZV8xLmNvbXBsZXRpb25DYWxsYmFjaygvKiBlcnJvciAqLyBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgc3RhdGVfMS5jb21wbGV0aW9uQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5hZGRUYXNrID0gYWRkVGFzaztcclxuZnVuY3Rpb24gcnVuKGNvZGVUb1J1biwgY29tcGxldGlvbkNhbGxiYWNrKSB7XHJcbiAgICB2YXIgc3luY2hyb25vdXNSZXN1bHQ7XHJcbiAgICBkb21haW5Db250ZXh0LnJ1bkluTmV3RG9tYWluKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG51bVJlbWFpbmluZ1Rhc2tzOiAwLFxyXG4gICAgICAgICAgICBoYXNJc3N1ZWRTdWNjZXNzQ2FsbGJhY2s6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb21wbGV0aW9uQ2FsbGJhY2s6IGRvbWFpbi5hY3RpdmUuYmluZChjb21wbGV0aW9uQ2FsbGJhY2spXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkb21haW5Db250ZXh0LnNldChkb21haW5UYXNrc1N0YXRlS2V5LCBzdGF0ZSk7XHJcbiAgICAgICAgICAgIHN5bmNocm9ub3VzUmVzdWx0ID0gY29kZVRvUnVuKCk7XHJcbiAgICAgICAgICAgIC8vIElmIG5vIHRhc2tzIHdlcmUgcmVnaXN0ZXJlZCBzeW5jaHJvbm91c2x5LCB0aGVuIHdlJ3JlIGRvbmUgYWxyZWFkeVxyXG4gICAgICAgICAgICBpZiAoc3RhdGUubnVtUmVtYWluaW5nVGFza3MgPT09IDAgJiYgIXN0YXRlLmhhc0lzc3VlZFN1Y2Nlc3NDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuaGFzSXNzdWVkU3VjY2Vzc0NhbGxiYWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLmNvbXBsZXRpb25DYWxsYmFjaygvKiBlcnJvciAqLyBudWxsKTtcclxuICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICBzdGF0ZS5jb21wbGV0aW9uQ2FsbGJhY2soZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN5bmNocm9ub3VzUmVzdWx0O1xyXG59XHJcbmV4cG9ydHMucnVuID0gcnVuO1xyXG5mdW5jdGlvbiBiYXNlVXJsKHVybCkge1xyXG4gICAgaWYgKHVybCkge1xyXG4gICAgICAgIGlmIChkb21haW4uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZXJlJ3MgYW4gYWN0aXZlIGRvbWFpbiAoZS5nLiwgaW4gTm9kZS5qcyksIHNvIGFzc29jaWF0ZSB0aGUgYmFzZSBVUkwgd2l0aCBpdFxyXG4gICAgICAgICAgICBkb21haW5Db250ZXh0LnNldChkb21haW5UYXNrQmFzZVVybFN0YXRlS2V5LCB1cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVGhlcmUncyBubyBhY3RpdmUgZG9tYWluIChlLmcuLCBpbiBicm93c2VyKSwgc28gdGhlcmUncyBqdXN0IG9uZSBzaGFyZWQgYmFzZSBVUkxcclxuICAgICAgICAgICAgbm9Eb21haW5CYXNlVXJsID0gdXJsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBkb21haW4uYWN0aXZlID8gZG9tYWluQ29udGV4dC5nZXQoZG9tYWluVGFza0Jhc2VVcmxTdGF0ZUtleSkgOiBub0RvbWFpbkJhc2VVcmw7XHJcbn1cclxuZXhwb3J0cy5iYXNlVXJsID0gYmFzZVVybDtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG9tYWluXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybFwiKTsiXSwic291cmNlUm9vdCI6IiJ9