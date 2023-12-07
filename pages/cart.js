import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@/components/table";
import Input from "@/components/Input";


const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    max-width: 100px;
    max-height: 100px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid rgba(0,0,0, 0.1);
    display: flex;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    img{
        max-width: 80px;
        max-height: 80px;
    }
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [state, setState] = useState('')
    useEffect(() => {
        const fetchProducts = async () => {
            if (cartProducts.length > 0) {
                try {
                    const response = await axios.post('/api/cart', { ids: cartProducts });
                    setProducts(response.data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }
        };

        fetchProducts();
    }, [cartProducts]);

    function moreOfThisProduct(id) {
        addProduct(id)
    }
    function lessOfThisProduct(id) {
        removeProduct(id)
    }

    let total = 0
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price
    }

    if (typeof window !== 'undefined' && window.location.href.includes('success')) {
        return (
            <>
                <Header />
                <Center>
                    <Box>
                        <h1>Thank you for your order!</h1>
                        <p>We will send you the tracking details ASAP</p>
                    </Box>
                </Center>
            </>
        );
    }
    

    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name, email, city, pincode, streetAddress, state,
            cartProducts,
        })
        if (response.data.url) {
            window.location = response.data.url
        }
    }
    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {cartProducts.length === 0 ? (
                            <div>Your cart is empty</div>
                        ) : (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} />
                                                </ProductImageBox>
                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <Button onClick={() => lessOfThisProduct(product._id)}>
                                                    -
                                                </Button>
                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </QuantityLabel>
                                                <Button onClick={() => moreOfThisProduct(product._id)}>
                                                    +
                                                </Button>
                                            </td>
                                            <td>
                                                {cartProducts.filter(id => id === product._id).length
                                                    * product.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>
                                        </td>
                                        <td></td>
                                        <td>₹{total}</td>
                                    </tr>

                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {cartProducts.length > 0 && (
                        <Box>
                            <h2>Order information</h2>
                            <Input
                                type="text"
                                placeholder="Name"
                                value={name}
                                name="name"
                                onChange={
                                    ev => setName(ev.target.value)} />
                            <Input
                                type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={
                                    ev => setEmail(ev.target.value)} />
                            <CityHolder>
                                <Input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    name="city"
                                    onChange={
                                        ev => setCity(ev.target.value)} />
                                <Input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={pincode}
                                    name="pincode"
                                    onChange={
                                        ev => setPincode(ev.target.value)} />
                            </CityHolder>
                            <Input
                                type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                onChange={
                                    ev => setStreetAddress(ev.target.value)} />
                            <Input
                                type="text"
                                placeholder="State"
                                value={state}
                                name="state"
                                onChange={
                                    ev => setState(ev.target.value)} />

                            <Button
                                size={"l"}
                                black block
                                onClick={goToPayment}
                            >
                                Continue to payment
                            </Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    );
}
