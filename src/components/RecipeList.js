import React from 'react';
import styled from 'styled-components'

const Section = styled.div`
    background-color: ${props => (props.theme.mode === "dark" ? "#0f0f0a" : "#ccccb3")};
    padding: 0.33em;
`

function RecipeList() {
  return (
        <Section>
            <p>Placeholeder</p>
        </Section>
  );
}

export default RecipeList;