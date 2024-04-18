import React, { useState } from 'react'
import styled from 'styled-components'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    gap: 10px;
`

 const SubContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
 `

const SubContainerItem = styled.div`

`

const ItemBold = styled.h4`
  color: ${({ theme }) => theme.primaryText};
    
`

const ItemText = styled.p`
  color: ${({ theme }) => theme.thirdText};

`

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const ProjectStatsItem = () => {
    const [percentage, setPercentage] = useState(70);

  return (
    <Container>
        <div style={{width: '2.5rem', height: '2.5rem'}}>
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                    textSize: '2rem',
                    
                })}
             />
        </div>
        <SubContainer>
            <SubContainerItem>
                <ItemBold>UX research</ItemBold>
                <ItemText>UX description.......</ItemText>
            </SubContainerItem>
            <SubContainerItem>
                <ItemText>Deadline</ItemText>
                <ItemBold>Aug 22, 2024</ItemBold>
            </SubContainerItem>
            <SubContainerItem>
                <UserImage src='https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg'/>
                <UserImage src='https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg'/>
            </SubContainerItem>
        </SubContainer>
    </Container>
  )
}

export default ProjectStatsItem