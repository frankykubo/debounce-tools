# Debounce Tools

Debounce Tools is a TypeScript library for debouncing function calls in both synchronous and asynchronous contexts. 

## Installation

To install Debounce Tools, you can use NPM:

```
npm install @frankykubo/debounce-tools
```

## Usage

Here are the available functions in Debounce Tools:

| Function | Parameters | Description |
| --- | --- | --- |
| `debounceMemoize` | `callback: (...args: any[], prevArgs: any[][] = []) => any`, `delay: number` | Async function that debounces and memoizes the result of the callback function |
| `syncDebounceMemoize` | `callback: (...args: any[], prevArgs: any[][] = []) => void`, `delay: number` | Sync function that debounces and memoizes the result of the callback function |


### Example 1

```typescript
import { debounceMemoize } from '@frankykubo/debounce-tools';

const printStr = (someString: string, prevArgs: string[][] = []) => {
    console.log(someString);
    console.log(prevArgs.flatMap(str => str));
}

const printStrWrapped = debounceMemoize(printStr, 100);

printStrWrapped('Test');
printStrWrapped('debounced');
printStrWrapped('printStr');
printStrWrapped('function');


$ 'function'
$ [ 'Test', 'debounced', 'printStr' ]

```
### Example 2

```typescript
import { syncDebounceMemoize } from '@frankykubo/debounce-tools';

const printStr = (someString: string, prevArgs: string[][] = []) => {
    console.log(someString);
    console.log(prevArgs.flatMap(str => str));
    return someString;
}

const printStrWrapped = syncDebounceMemoize(printStr, 100);

printStrWrapped('Test');
printStrWrapped('debounced');
printStrWrapped('printStr');
printStrWrapped('function');


$ 'function'
$ [ 'Test', 'debounced', 'printStr' ]

```

## Contributing

Contributions are welcome! Please feel free to open issues and pull requests on GitHub.

## License
This project is licensed under the MIT License.