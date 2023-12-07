import styled from 'styled-components';
import Center from './Center';
import ProductBox from './ProductBox';

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    padding-top: 30px;
`

export default function NewProducts({ newProducts }) {
    return (
        <Center>
            <ProductGrid>
                {newProducts ? newProducts.map(product => (
                    <ProductBox key={product._id} {...product} />
                )) : null}
            </ProductGrid>
        </Center>

    );
}
