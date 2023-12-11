import styled from "styled-components"
import OutfitBox from "./OutfitBox"

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr ;
    gap: 10px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`

export default function OutfitGrid({products}) {
    return(
        <StyledGrid>
            {products ? products.map(product => (
                    <OutfitBox key={product._id} {...product} />
                )) : null}
        </StyledGrid>
    )
}