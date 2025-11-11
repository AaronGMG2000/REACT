import { ItemCounter } from './shoping-cart/ItemCounter';

interface ItemInCart {
    productName: string;
    quantity: number;
}

const itemsInCart: ItemInCart[] = [
    { productName: 'Nintendo Switch', quantity: 1 },
    { productName: 'Pro Controller', quantity: 2 },
    { productName: 'Joy-Con', quantity: 3 },
];

export function FirstStepsApp() {
    return (
        <>
            <h1>Carrito de compras</h1>
            {itemsInCart.map((item) => (
                <ItemCounter
                    key={item.productName}
                    name={item.productName}
                    quantity={item.quantity}
                />
            ))}
        </>
    );
}
