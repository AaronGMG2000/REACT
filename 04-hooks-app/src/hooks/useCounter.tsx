import { useState } from 'react';

export const useCounter = () => {
    const [counter, setCounter] = useState<number>(1);

    const increment = () => setCounter(counter + 1);
    const decrement = () => {
        if (counter > 1) setCounter(counter - 1);
    };

    return {
        counter,
        increment,
        decrement,
    };
};
