export const syncDebounceMemoize = <F extends (...args: any[]) => void>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout>
    let prevCallbackArgs: Parameters<F>[] = []

    return (...args: Parameters<F>): void => {
        prevCallbackArgs.push(args);
        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            prevCallbackArgs = prevCallbackArgs.filter((item) => item !== args);
            func(...args, prevCallbackArgs);
            prevCallbackArgs = [];
        }, waitFor)
    }
}