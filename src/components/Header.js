import React from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'

const Title = styled.h1`
    font-size: 2.2rem;
    margin: .25em;
    text-align: center;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
`
const SubTitle = styled.h6`
    font-size: 1.25rem;
    text-align: center;
    margin: 0 auto;
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
`
const NavBar = styled.ul`
    display: inline;
    text-decoration: none;
    text-align: left;
    list-style-type: none;
    margin: 0 auto;
`
const Section = styled.div`
    background-color: ${props => (props.theme.mode === "dark" ? "#0f0f0a" : "#ccccb3")};
    margin: 0 auto;
    padding: 1em;
`
const StyledLink = styled(Link)`
    color: ${props => (props.theme.mode === "dark" ? "#ffffff" : "#000000")};
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
`

const DarkModeButton = styled.button`
    display: inline;
    float: right;
    font-family: inherit;
    padding: .25em
    margin: 1rem;
    font-size: 1rem;
    line-height: 1.4;
    border: 0;
    border-radius: 0.5rem;
    background: ${props => (props.theme.mode === "dark" ? "#e6f2ff" : "#00264d")};
    color: ${props => (props.theme.mode === "dark" ? "#000000" : "#ffffff")};
    white-space: nowrap;
    cursor: pointer;
    &:hover {
        background: ${props => (props.theme.mode === "dark" ? "#99ccff" : "#004d99")};
    }
    &:focus {
        background: ${props => (props.theme.mode === "dark" ? "#99ccff" : "#004d99")};
    }
`

function Header(props) {
    const {theme, updateTheme} = props

    return (
        <Section>
            <Title>BuyList</Title>
            <SubTitle>The Simplest Shopping List</SubTitle>
            <NavBar aria-label="Navigation List">
                <StyledLink aria-label="Return to Locations Home Page" to="/">Home</StyledLink>
            </NavBar>
            <DarkModeButton aria-label="Toggle between light/dark styling modes" 
                onClick={updateTheme}>Toggle {theme.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </DarkModeButton>
        </Section>
    );
}

export default Header;