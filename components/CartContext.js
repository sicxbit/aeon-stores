const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider(props) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const defaultProducts = ls ? JSON.parse(ls.getItem('cart')) : [];
    const [cartProducts, setCartProducts] = useState(defaultProducts || []);

    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]);

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, [ls]);
    

    function addProduct(productId) {
        setCartProducts(prev => [...prev, productId]);
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
            {props.children}
        </CartContext.Provider>
    );
}
