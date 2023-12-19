import styled from "styled-components";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/Cart";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { useRouter } from "next/router";
import { mongooseConnect } from "../lib/mongoose";
import axios from "axios";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 6fr 1.4fr;
    margin-top: 40px;
  }
  gap: 40px;
  margin-top: 20px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ComingSoonMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
`;

const CategoryPage = ({ category, products }) => {
  const { addProduct } = useContext(CartContext);
  const router = useRouter();

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            {products.length > 0 ? (
              <ProductImages images={products[0].images} />
            ) : (
              <ComingSoonMessage>Coming Soon</ComingSoonMessage>
            )}
          </WhiteBox>
          <div>
            <Title>{category.name}</Title>
            {products.length > 0 ? (
              <>
                <p>{products[0].description}</p>
                <PriceRow>
                  <div>₹{products[0].price}</div>
                  <Button primary onClick={() => addProduct(products[0]._id)}>
                    <CartIcon />
                    Add to cart
                  </Button>
                </PriceRow>
              </>
            ) : null}
          </div>
        </ColWrapper>
      </Center>
    </>
  );
};

export async function getServerSideProps(context) {
    const { id } = context.query;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    await mongooseConnect();
  
    try {
      // Fetch category data using Axios
      const categoryResponse = await axios.get(`${apiBaseUrl}/category/${id}`);
      const categoryData = categoryResponse.data;
  
      // Fetch products that belong to the category using Axios
      const productsResponse = await axios.get(`${apiBaseUrl}/products?category=${id}`);
      const productsData = productsResponse.data;
  
      console.log("Category Data:", categoryData);
      console.log("Products Data:", productsData);
  
      return {
        props: {
          category: categoryData,
          products: productsData,
        },
      };
    } catch (error) {
      console.error("Error fetching data:", error);
  
      return {
        notFound: true,
      };
    }
  }
  
export default CategoryPage;
