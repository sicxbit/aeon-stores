import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/Cart";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 3rem;
    @media screen and (min-width: 768px) {
      font-size: 3rem;
    }
`;

const Desc = styled.p`
    color: gray;
    font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    img {
        max-width: 100%;
        max-height: 300px;
        margin: 0 auto;
    }
    div:nth-child(1){
      order: 2;
    }
    @media screen and (min-width: 768px) {
      grid-template-columns: 0.8fr 1fr;
      img {
        max-width: 100%;
        max-height: 500px;
      }
      div:nth-child(1){
      order: 0;
    }
    }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 20px;
`;



export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCart() {
    if (product) {
      addProduct(product._id);
    }
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            {product ? (
              <div>
                <Title>{product.title}</Title>
                <Desc>{product.description}</Desc>
                <ButtonsWrapper>
                  <ButtonLink href={"/product/" + product._id} white={1} outline={1}>
                    Read more
                  </ButtonLink>
                  <Button white onClick={addFeaturedToCart}>
                    <CartIcon />
                    Add to cart
                  </Button>
                </ButtonsWrapper>
              </div>
            ) : (
              <p>Loading...</p>
             
            )}
          </Column>
          <Column>
            {product && (
              <img src={product.images[1]} alt="" />
            )}
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
