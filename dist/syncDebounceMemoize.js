"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDebounceMemoize = void 0;
const syncDebounceMemoize = (func, waitFor) => {
    let timeout;
    let prevCallbackArgs = [];
    return (...args) => {
        prevCallbackArgs.push(args);
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            prevCallbackArgs = prevCallbackArgs.filter((item) => item !== args);
            func(...args, prevCallbackArgs);
            prevCallbackArgs = [];
        }, waitFor);
    };
};
exports.syncDebounceMemoize = syncDebounceMemoize;
