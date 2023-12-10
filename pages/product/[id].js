import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "../lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/Cart";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 6fr 1.4fr;
    gap: 40px;
    margin-top: 40px;
`;

const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

export default function ProductPage({ product }) {
    const {addProduct} = useContext(CartContext)
    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={product.images} />
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div>₹{product.price}</div>
                            <Button primary onClick={() => addProduct(product._id)}>
                                <CartIcon />
                                Add to cart
                            </Button>
                        </PriceRow>

                    </div>
                </ColWrapper>

            </Center>
        </>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect()
    const { id } = context.query;
    const product = await Product.findById(id)
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}