import React from 'react'
import styled from 'styled-components'

const Container = styled.div`

`

const SubContainer = styled.div`
    flex-direction: column;
    display: flex;
    align-items: baseline;
    gap: 10px;
`

const Text = styled.p`

`

const MaterialIcon = (props) => (
    <span className={`${props.className} material-symbols-outlined`} style={props.style}>{props.name}</span>
  )
  
const Icon = styled(MaterialIcon)`
color: ${props => props.color ? props.color : ({ theme }) => theme.thirdText};
font-size: 28px;
&.material-symbols-outlined {
    font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
};
cursor: pointer;
`

const SmallWidget = ({ text, value, iconName}) => {
  return (
    <Container>
        <SubContainer>
            <Text>{text}</Text>
            <Text>{value}</Text>
        </SubContainer>
        <Icon name={iconName}/>
    </Container>
  )
}

export default SmallWidget
