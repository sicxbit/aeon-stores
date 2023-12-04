import styled from "styled-components";
import Center from "./Center";

const Bg = styled.div`
    background-color:#222 ;
    color: #fff;
    padding: 50px 0;
`
const Title = styled.h1`
margin:0;
font-weight: normal ;
`
const Desc = styled.p`
color:gray;
font-size: 0.8rem;
`
const Wrapper = styled.div`
display:grid;
grid-template-columns:0.8fr 1fr;
gap: 40px;
img {
    max-width: 100% ;
}
`;

const Column = styled.div`
    display: flex;
    align-items: center;
`;

export default function Featured() {
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <Column>
                        <div>
                            <Title>Pro anywhere</Title>
                            <Desc>Reprehenderit  minim sunt mollit fugiat nostrud aliquip nulla aliqua anim exercitation. 
                                Do nulla sunt tempor fugiat esse consequat deserunt laborum eu
                              . Incididunt elit magna aute ipsum deserunt occaecat et ut.</Desc>
                            <button>read more</button>
                            <button>add to cart</button>
                        </div>
                    </Column>
                    <Column>
                        <img src="https://storage.googleapis.com/aeon-product-images/1701725135053-.jpg"
                            alt="" />
                    </Column>
                </Wrapper>
            </Center>
        </Bg>
    )
}