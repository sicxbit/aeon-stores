import { primary } from "@/pages/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  background-color: #CCCCCC;
  border: 0;
  color: black;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  text-decoration: none;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  svg {
    height: 17px;
    margin-right: 5px;
    padding-bottom: px;
  }
  ${props =>
    props.white &&
    css`
      background-color: white;
      color: #000;
    `}
  ${props =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid white;
    `}
  ${props =>
    props.primary &&
    css`
      background-color: ${primary};
      color: #fff;
      border: 1px solid ${primary};
    `}
    ${props =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${primary};
      border: 1px solid ${primary};
    `}
    ${props =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${props =>
    props.size === "l" &&
    css`
      text-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
    ${props =>
    props.black &&
    css`
      background-color: black;
      color: #fff;
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return (
    <StyledButton {...rest}>
      {children}
    </StyledButton>
  );
}
