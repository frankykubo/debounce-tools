export declare const debounceMemoize: <F extends (...args: any[]) => any>(func: F, waitFor: number) => (...args: Parameters<F>) => Promise<ReturnType<F>>;
