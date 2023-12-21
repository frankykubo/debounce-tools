"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounceMemoize = void 0;
const debounceMemoize = (func, waitFor) => {
    let timeout;
    let prevCallbackArgs = [];
    const resolves = [];
    return (...args) => {
        return new Promise(resolve => {
            prevCallbackArgs.push(args);
            resolves.push(resolve);
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(async () => {
                prevCallbackArgs = prevCallbackArgs.filter((item) => item !== args);
                const returnVal = await func(...args, prevCallbackArgs);
                resolves.forEach(r => r(returnVal));
                resolve(returnVal);
                prevCallbackArgs = [];
                resolves.length = 0;
            }, waitFor);
        });
    };
};
exports.debounceMemoize = debounceMemoize;
