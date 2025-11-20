import { useMemo, useState } from 'react';

const heavyStuff = (iterationNumber: number) => {
    console.time('Heavy stuff');
    for (let i = 0; i < iterationNumber; i++) {
        console.log(i);
    }
    console.timeEnd('Heavy stuff');

    return `${iterationNumber} iteraciones realizadas`;
};

export const MemoCounter = () => {
    const [counter, setCounter] = useState(40_000);
    const [counter2, setCounter2] = useState(10);

    const heavyStuffMemo = useMemo(() => heavyStuff(counter), [counter]);
    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-thin text-white">
                MemoCounter - {heavyStuffMemo}
            </h1>
            <hr />
            <h2>Counter: {counter}</h2>
            <h2>Counter2: {counter2}</h2>

            <button
                type="button"
                onClick={() => setCounter(counter + 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
                +1
            </button>
            <button
                type="button"
                onClick={() => setCounter2(counter2 + 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
                +1
            </button>
        </div>
    );
};
