import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import { ThemeContext } from '../contexts/themeContext'

const Title = styled.h1`
    font-size: 2.2rem;
    margin-top: .25em;
    text-align:center;
`
const SubTitle = styled.h6`
    font-size: 1.25rem;
    text-align: center;
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
    margin: 0 auto;
    padding: 1em;
`
const StyledLink = styled(Link)`
    color: Black;
    text-decoration: none;
    padding: .25em
    margin: 1rem;
    font-size: 1rem;
    &:hover {
        text-decoration: underline;
    }
    &:focus {
        text-decoration: underline;
    }
`;

function Header() {
    const context = useContext(ThemeContext)

    return (
        <Section>
            <Title>BuyList</Title>
            <SubTitle>The Simplest Shopping List</SubTitle>
            <NavBar aria-label="Navigation List">
                <StyledLink aria-label="Return to Locations Home Page" to="/">Home</StyledLink>
            </NavBar>
            <button onClick={context.toggleTheme}>Toggle</button>
        </Section>
    );
}

export default Header;