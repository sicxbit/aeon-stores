const { createContext, Children, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider(props) {
    const [cartProducts, setCartProducts] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    );
    useEffect(() => {
        if(cartProducts?.length >0) {
            localStorage.setItem('cart', JSON.stringify(cartProducts))
        }
    }, [cartProducts])
    function addProduct(productId) {
        setCartProducts(prev => [...prev, productId])
    }
    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts,addProduct }}>
            {props.children}
        </CartContext.Provider>
    );
} 
