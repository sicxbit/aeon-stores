import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductBox from './ProductBox';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function AcessoryGrid({ products }) {
  const [targetCategoryIds, setTargetCategoryIds] = useState([]);

  useEffect(() => {
    const fetchCategoryNamesAndSet = async () => {
      try {
        const response = await axios.get('/api/categories');
        const categories = response.data;


        const updatedTargetCategoryIds = categories
          .filter((category) => {
            const name = category.parent?.name || category.name; 
            return name === "Acessories";
          })
          .map((category) => category._id.toString()); 

        setTargetCategoryIds(updatedTargetCategoryIds);

      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategoryNamesAndSet();
  }, []);

  return (
    <StyledGrid>
      {products
        ? products.map((product) =>
            product.category && targetCategoryIds.includes(product.category.toString()) ? (
              <ProductBox key={product._id.toString()} {...product} />
            ) : null
          )
        : null}
    </StyledGrid>
  );
}
