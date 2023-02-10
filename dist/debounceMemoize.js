"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounceMemoize = void 0;
const debounceMemoize = (func, waitFor) => {
    let timeout;
    let prevCallbackArgs = [];
    return (...args) => new Promise(resolve => {
        prevCallbackArgs.push(args);
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            prevCallbackArgs = prevCallbackArgs.filter((item) => item !== args);
            resolve(func(...args, prevCallbackArgs));
            prevCallbackArgs = [];
        }, waitFor);
    });
};
exports.debounceMemoize = debounceMemoize;
