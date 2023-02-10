# debounce-tools

const printStr2 = (par: string, prevArgs: string[][] = []) => {
    console.log(par);
    console.log(prevArgs.flatMap(str => str));
}

const wrapped2 = debounceMemoize(printStr2, 100);

wrapped2('Alojz');
wrapped2('Kuko');
wrapped2('Durko');
wrapped2('Lucy');