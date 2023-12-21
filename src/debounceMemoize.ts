export const debounceMemoize = <F extends (...args: any[]) => Promise<any>>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    let prevCallbackArgs: Parameters<F>[] = [];
    let resolves: ((value: ReturnType<F> | PromiseLike<ReturnType<F>>) => void)[] = [];

    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
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
                } catch (error) {
                    resolves.forEach(resolve => resolve(Promise.reject(error)));
                }
                prevCallbackArgs = [];
                resolves = [];
            }, waitFor);
        });
    };
};
