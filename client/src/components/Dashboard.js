import React from 'react'
import styled from 'styled-components'
import ProgressBar from "@ramonak/react-progress-bar";
import ProjectStatsItem from './dashboard/ProjectStatsItem'
import RecentActItem from './dashboard/RecentActItem';
import SmallWidget from './dashboard/SmallWidget';

const Container = styled.div`
    width: 100%;
    height: 98%;
    padding-top: 10px;
`

const Banner = styled.img`
    width: 99%;
    height: 17%;
    object-fit: cover;
    border-radius: 15px;
    margin-bottom:10px;
`

const MainSection = styled.div`
    width: 100%;
    height: 82%;
    display: flex;
    gap: 1rem;
`

const RightSubSection = styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const LeftSubSection = styled.div`
    height: 98%;
    width: 63%;
    display: flex;
    flex-direction: column;
    gap: 10px;

`

const InformationContainer = styled.div`
    background-color: ${({ theme }) => theme.secondaryBackground};
    display: flex;
    height: ${props => props.height ? props.height : '50%'};
        flex-direction: column;
    padding: 15px;
    border-radius: 10px;
    gap: 12px;
`

const InformationTitle = styled.h2`
    color: ${({ theme }) => theme.primaryText};
    font-size: 19px;
    font-weight: 600;
    padding: 5px 0;
`

const InformationText = styled.p`
  color: ${({ theme }) => theme.secondaryText};

`

const InfoSubContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${props => props.width && {width: props.width}};
`

const InfoSubContainerItem = styled.div`
    display: flex;
    flex-direction: column;
`

const Scrollable = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    overflow: scroll;
`

const WidgetGrid = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
`

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const Dashboard = () => {
  return (
    <Container>
        <Banner src={'https://media.istockphoto.com/id/603164912/photo/suburb-asphalt-road-and-sun-flowers.jpg?s=612x612&w=0&k=20&c=qLoQ5QONJduHrQ0kJF3fvoofmGAFcrq6cL84HbzdLQM='}/>
        <MainSection>
            <LeftSubSection>
                <InformationContainer>
                    <InformationTitle>Project Info</InformationTitle>
                    <InformationText>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </InformationText>
                    <InfoSubContainer>
                        <InfoSubContainerItem>
                            <InformationTitle>Project type</InformationTitle>
                            <InformationText>Ecomerce Website</InformationText>
                        </InfoSubContainerItem>
                        <InfoSubContainerItem>
                            <InformationTitle>Start Date</InformationTitle>
                            <InformationText>Aug 10, 2024</InformationText>
                        </InfoSubContainerItem>
                        <InfoSubContainerItem>
                            <InformationTitle>Deadline</InformationTitle>
                            <InformationText>Sep 21. 2024</InformationText>
                        </InfoSubContainerItem>
                        <InfoSubContainerItem>
                            <InformationTitle>Team members</InformationTitle>
                            <InformationText>5</InformationText>
                        </InfoSubContainerItem>
                        <InfoSubContainerItem>
                            <InformationTitle>Reports</InformationTitle>
                            <InformationText>3</InformationText>
                        </InfoSubContainerItem>
                    </InfoSubContainer>
                    <InfoSubContainer width={'9rem'}>
                        <UserImage src='https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg'/>
                        <InfoSubContainerItem>
                            <InformationText>Project leader</InformationText>
                            <InformationTitle>Jhon Doe</InformationTitle>
                        </InfoSubContainerItem>
                    </InfoSubContainer>
                </InformationContainer>
                <InformationContainer height={'45%'}>
                    <InformationTitle>Project statistics</InformationTitle>
                    <Scrollable>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                        <ProjectStatsItem/>
                    </Scrollable>
                </InformationContainer>
            </LeftSubSection>
            <RightSubSection>
                <InformationContainer height={'10%'}>
                    <InfoSubContainer>
                        <InformationTitle>Overall progress</InformationTitle>
                        <InformationTitle>70%</InformationTitle>
                    </InfoSubContainer>
                    <ProgressBar
                        bgColor='#B9FF65'
                        isLabelVisible={false}
                        completed={70}
                    />
                </InformationContainer>
                <WidgetGrid>
                    <SmallWidget text={'Time remaining'} value={'4d'} iconName={'timer'}/>
                    <SmallWidget text={'Created tasks'} value={'20'} iconName={'check_circle'}/>
                    <SmallWidget text={'Task in progress'} value={'10'} iconName={'play_circle'}/>
                    <SmallWidget text={'Upcoming tasks'} value={'7'} iconName={'schedule'}/>
                </WidgetGrid>
                <InformationContainer>
                    <InformationTitle>Recent activity</InformationTitle>
                    <Scrollable>
                        <RecentActItem/>
                        <RecentActItem/>
                        <RecentActItem/>
                        <RecentActItem/>
                    </Scrollable>
                </InformationContainer>
            </RightSubSection>
        </MainSection>
    </Container>
)
}

export default Dashboard