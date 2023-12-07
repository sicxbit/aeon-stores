import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@/components/table";

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

export default function CartPage() {
    const { cartProducts } = useContext(CartContext);
    const [products, setProducts] = useState([])
    console.log(cartProducts);
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
                                            <td>{cartProducts.filter(id => id === product._id).length}</td>
                                            <td>{cartProducts.filter(id => id === product._id).length
                                            * product.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {cartProducts.length > 0 && (
                        <Box>
                            <h2>Order information</h2>
                            <input type="text" placeholder="Address" />
                            <input type="text" placeholder="Address 2" />
                            <Button size={"l"} black block>
                                Continue to payment
                            </Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    );
}
