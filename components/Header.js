
import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";

const StyledHeader = styled.header`
  background-color: #222;
  display: ${(props) => (
    props.isLoggedIn ? 'none' : 'block'
)};
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    display: ${(props) => (props.open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #222;
    padding: 70px 20px 20px;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

export default function Header() {
  const [isNavOpen, setNavOpen] = useState(false);
  const { cartProducts } = useContext(CartContext);


  const toggleNav = () => setNavOpen(!isNavOpen);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Aeon stores</Logo>
          <StyledNav open={isNavOpen}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/outfits"}>Outfits</NavLink>
            <NavLink href={"/acessories"}>Acessories</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={toggleNav}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
