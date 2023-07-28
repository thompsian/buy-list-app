import React from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'

const Title = styled.h1`
    font-size: 2.2rem;
    margin-left: 16px;
    display: inline;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
`
const SubTitle = styled.h6`
    font-size: 1rem;
    margin: 0;
    display: inline;
    vertical-align: top;
    float: right;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
`
const NavBar = styled.ul`
    text-decoration: none;
    text-align: left;
    list-style: none;
    margin: 0;
    padding: 0;
`
const Section = styled.div`
    background-color: ${props => (props.theme.mode === "dark" ? "#0f0f0a" : "#ccccb3")};
    margin: 0 auto;
    padding: 1em;
`
const TitleDiv = styled.div`

`

const MenuDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const StyledLink = styled(Link)`
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
    text-decoration: none;
    padding: 0 16px 0 16px;
    margin: 0;
    font-size: 2.3rem;
    &:hover {
        text-decoration: underline;
    }
    &:focus {
        text-decoration: underline;
    }
`

const DarkModeButton = styled.button`
    font-family: inherit;
    padding: 11px;
    margin: 0.2rem;
    font-size: 1rem;
    line-height: 1.4;
    border: 0;
    border-radius: 3rem;
    background: ${props => (props.theme.mode === "dark" ? "#99ccff" : "#00264d")};
    color: ${props => (props.theme.mode === "dark" ? "#000000" : "#ffffff")};
    white-space: nowrap;
    cursor: pointer;
    &:hover {
        background: ${props => (props.theme.mode === "dark" ? "#e6f2ff" : "#004d99")};
    }
    &:focus {
        background: ${props => (props.theme.mode === "dark" ? "#e6f2ff" : "#004d99")};
    }
`

function Header(props) {
    const {theme, updateTheme} = props

    return (
        <Section>
            <TitleDiv>
                <Title>BuyList</Title>
                <SubTitle>The Simplest Shopping List</SubTitle>
            </TitleDiv>
            <MenuDiv>
                <NavBar aria-label="Navigation List">
                    <StyledLink aria-label="Return to Locations Home Page" to="/">Home</StyledLink>
                    <StyledLink aria-label="Recipes / Sets of items from multiple locations" to="/recipes">Recipes</StyledLink>
                    <StyledLink aria-label="Control webpage settings" to="/settings">Settings</StyledLink>
                </NavBar>
                <DarkModeButton aria-label="Toggle between light/dark styling modes" 
                    onClick={updateTheme}>Toggle {theme.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                </DarkModeButton>
            </MenuDiv>
        </Section>
    );
}

export default Header;