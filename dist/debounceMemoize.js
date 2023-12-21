"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounceMemoize = void 0;
const debounceMemoize = (func, waitFor) => {
    let timeout;
    let prevCallbackArgs = [];
    let resolves = [];
    return (...args) => {
        return new Promise(resolve => {
            prevCallbackArgs.push(args);
            resolves.push(resolve);
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(async () => {
                const aggregatedArgs = prevCallbackArgs.flat(Number.POSITIVE_INFINITY);
                try {
                    const result = await func(...aggregatedArgs);
                    resolves.forEach(resolve => resolve(result));
                }
                catch (error) {
                    resolves.forEach(resolve => resolve(Promise.reject(error)));
                }
                prevCallbackArgs = [];
                resolves = [];
            }, waitFor);
        });
    };
};
exports.debounceMemoize = debounceMemoize;
