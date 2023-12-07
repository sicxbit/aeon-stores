import styled from 'styled-components';
import Center from './Center';
import ProductBox from './ProductBox';

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
`
const Title= styled.h2`
  font-size: 2rem;
  margin: 30px 0px 20px;
  font-weight: normal;
`;

export default function NewProducts({ newProducts }) {
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductGrid>
                {newProducts ? newProducts.map(product => (
                    <ProductBox key={product._id} {...product} />
                )) : null}
            </ProductGrid>
        </Center>

    );
}
