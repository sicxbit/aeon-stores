import styled from "styled-components"
import ProductBox from "./ProductBox"

const StyledProductGrid = styled.div`
padding-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr ;
    gap: 10px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`

export default function ProductGrid({products}) {
    return(
        <StyledProductGrid>
            {products ? products.map(product => (
                    <ProductBox key={product._id} {...product} />
                )) : null}
        </StyledProductGrid>
    )
}