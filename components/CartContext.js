const { createContext, Children, useState } = require("react");

export const CartContext = createContext({});

export function CartContextProvider(props) {
    const [cartProducts, setCartProducts] = useState([]);
    function addProduct(productId) {
        setCartProducts(prev => [...prev, productId])
    }
    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts,addProduct }}>
            {props.children}
        </CartContext.Provider>
    );
}
