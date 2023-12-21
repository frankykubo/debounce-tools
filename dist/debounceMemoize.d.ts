export declare const debounceMemoize: <F extends (...args: any[]) => Promise<any>>(func: F, waitFor: number) => (...args: Parameters<F>) => Promise<ReturnType<F>>;
