import React from 'react';
import styled from 'styled-components'

const Section = styled.div`
    background-color: #ccccb3;
    padding: 0.33em;
`
const SubTitle = styled.h6`
    font-size: .75rem;
    text-align: center;
    margin: 0 auto;
`
const LinkList = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ListItem = styled.li`
    float: left;
`

const StyledLink = styled.a`
    display: block;
    color: black;
    text-align: center;
    padding: .15em .75em;
    text-decoration: none;
    letter-spacing: 1px;
    &:hover {
        text-decoration: underline;
    }
    &:focus {
        text-decoration: underline;
    }
`

function Footer() {
  return (
        <Section>
            <SubTitle>Copyright 2022: Developed by Ian Thompson</SubTitle>
            <LinkList>
                <ListItem>
                    <StyledLink href = "https://thompsian.github.io/" target="_blank" rel="noreferrer">Portfolio</StyledLink>
                </ListItem>
                <ListItem>
                    <StyledLink href = "https://www.linkedin.com/in/thompsian/" target="_blank" rel="noreferrer">LinkedIn</StyledLink>
                </ListItem>
                <ListItem>
                    <StyledLink href = "https://github.com/thompsian/buy-list-app/" target="_blank" rel="noreferrer">WebApp Github</StyledLink>
                </ListItem>
                <ListItem>
                    <StyledLink href = "https://github.com/thompsian/BuyAPI/" target="_blank" rel="noreferrer">API Github</StyledLink>
                </ListItem>
            </LinkList>
        </Section>
  );
}

export default Footer;