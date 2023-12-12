import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryBox from './CategoryBox';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function CategoryGrid({ categories }) {

  return (
    <StyledGrid>
      {categories
        ? categories.map((category) => (
            <CategoryBox key={category._id.toString()} {...category} />
          ))
        : null}
    </StyledGrid>
  );
}
