import styled from "styled-components"
import css from "styled-jsx/css"

const StyledButtton = styled.button`
    background-color: gray;
    border: 0;
    color: black;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    box-sizing: border-box;
    display: inline-flex;
    svg{
        height: 17px;
        margin-right: 5px;
        padding-bottom:px;
    }
    ${props => props.white && !props.outline && css`
        background-color: white;
        color: #000;
    `}
    ${props => props.white && props.outline && css`
        background-color: transparent;
        color: #fff;
        border: 1px solid white;
    `}
    ${props => props.primary && css`
        background-color: green;
        color: #fff;
        border: 1px solid green;
    `}
    ${props => props.size === 'l' && css`
        text-size:1.2rem;
        padding: 10px 20px;
        svg{
            height: 20px;
        }
    `}
`


export default function Button({ children, ...rest }) {
    return (
        <StyledButtton {...rest}>{children}</StyledButtton>
    )
}