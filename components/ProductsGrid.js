import styled from "styled-components"
import ProductBox from "./ProductBox"

const StyledProductGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
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