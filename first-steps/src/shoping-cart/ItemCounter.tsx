import React from 'react';
import styles from './ItemCounter.module.css';

interface Props {
    name: string;
    quantity?: number;
}

export const ItemCounter = ({ name, quantity = 0 }: Props) => {
    const [count, setCount] = React.useState(quantity);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count <= 0) return;
        setCount(count - 1);
    };

    return (
        <section className={styles['item-row']}>
            <span className={styles['item-text']}>{name}</span>
            <button onClick={handleDecrement}>-</button>
            <span>{count}</span>
            <button onClick={handleIncrement}>+</button>
        </section>
    );
};
