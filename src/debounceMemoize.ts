export const debounceMemoize = <F extends (...args: any[]) => Promise<any>>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    let prevCallbackArgs: Parameters<F>[] = [];
    const resolves: ((value: ReturnType<F> | PromiseLike<ReturnType<F>>) => void)[] = [];

    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
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