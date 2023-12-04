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
grid-template-columns:1fr 1fr;
gap: 40px;
`;

export default function Featured() {
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <div>
                        <Title>Pro anywhere</Title>
                        <Desc>Reprehenderit  minim sunt mollit fugiat nostrud aliquip nulla aliqua anim exercitation. Do nulla sunt tempor fugiat esse consequat deserunt laborum eu. Incididunt elit magna aute ipsum deserunt occaecat et ut.</Desc>
                    </div>
                    <div></div>
                </Wrapper>
            </Center>
        </Bg>
    )
}