import styled from "styled-components"
import OutfitBox from "./OutfitBox"

const StyledProductGrid = styled.div`
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
                    <OutfitBox key={product._id} {...product} />
                )) : null}
        </StyledProductGrid>
    )
}