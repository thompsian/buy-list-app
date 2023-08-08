import React from 'react'
import { NavLink } from "react-router-dom"
import styled from 'styled-components'
import useMediaQuery from '../hooks/useMediaQuery'

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
    display: flex;
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

const StyledLink = styled(NavLink)`
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
    const isDesktop = useMediaQuery('(min-width: 960px)')

    return (
        <Section>
            <TitleDiv>
                <Title>BuyList</Title>
                <SubTitle>The Simplest Shopping List</SubTitle>
            </TitleDiv>
            <MenuDiv>
                {isDesktop ? (
                <NavBar aria-label="Navigation List">
                    <StyledLink aria-label="Return to Locations Home Page" to="/">Home</StyledLink>
                    <StyledLink aria-label="Control webpage settings" to="/settings">Settings</StyledLink>
                </NavBar>
                ):
                (
                    <svg width="100px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355ZM18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16ZM18 12.75C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H6C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75H18ZM18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z" fill="#1C274C"/>
                    </svg>
                )
                }
                <DarkModeButton aria-label="Toggle between light/dark styling modes" 
                    onClick={updateTheme}>Toggle {theme.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                </DarkModeButton>
            </MenuDiv>
        </Section>
    );
}

export default Header;