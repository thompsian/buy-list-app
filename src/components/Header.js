import React from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'

const Title = styled.h1`

`
const SubTitle = styled.h6`

`
const NavBar = styled.nav`

`

function Header() {
  return (
    <div>
        <Title>BuyList</Title>
        <SubTitle>Open Source Shopping List Progressive Web Application</SubTitle>
        <NavBar>
            <Link to="/">Home</Link>
        </NavBar>
    </div>
  );
}

export default Header;