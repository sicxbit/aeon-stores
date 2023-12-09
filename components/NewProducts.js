import styled from 'styled-components';
import Center from './Center';
import ProductGrid from './ProductsGrid';

const Title= styled.h2`
  font-size: 2rem;
  margin: 30px 0px 20px;
  font-weight: normal;
`;

export default function NewProducts({ newProducts }) {
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductGrid products={newProducts} />
        </Center>

    );
}
