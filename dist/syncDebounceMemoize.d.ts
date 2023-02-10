export declare const syncDebounceMemoize: <F extends (...args: any[]) => void>(func: F, waitFor: number) => (...args: Parameters<F>) => void;
