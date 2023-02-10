export const debounceMemoize = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout>
    let prevCallbackArgs: Parameters<F>[] = []

    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
        new Promise(resolve => {
            prevCallbackArgs.push(args);
            if (timeout) {
                clearTimeout(timeout)
            }

        timeout = setTimeout(() => {
            prevCallbackArgs = prevCallbackArgs.filter((item) => item !== args);
            resolve(func(...args, prevCallbackArgs));
            prevCallbackArgs = [];
        }, waitFor)
    })
}