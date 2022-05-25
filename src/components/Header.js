import React from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'

const Title = styled.h1`
    font-size: 38px;
    margin-top: 10px;
    text-align:center;
`
const SubTitle = styled.h6`
    font-size: 16px;
    text-align:center;
    margin: 0 auto;
`
const NavBar = styled.ul`
    text-decoration: none;
    text-align:left;
    list-style-type:none;
    margin: 0 auto;
`
const Section = styled.div`
    background-color: #ccccb3;
    border-radius: 15px; 
    margin: 0 auto;
    padding: 15px;
`
const StyledLink = styled(Link)`
    color: Black;
    text-decoration: none;
    padding: 5px
    margin: 1rem;
`;

function Header() {
  return (
    <Section>
        <Title>BuyList</Title>
        <SubTitle>The Simplest Shopping List Web Application</SubTitle>
        <NavBar>
            <StyledLink to="/">Home</StyledLink>
        </NavBar>
    </Section>
  );
}

export default Header;