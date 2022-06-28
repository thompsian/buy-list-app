import React from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'

const Title = styled.h1`
    font-size: 2.5rem;
    margin-top: .25em;
    text-align:center;
`
const SubTitle = styled.h6`
    font-size: 1.25rem;
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
    padding: 1em;
`
const StyledLink = styled(Link)`
    color: Black;
    text-decoration: none;
    padding: .25em
    margin: 1rem;
    font-size: 1rem;
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