import React from "react";
// import { observable, action, runInAction } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import Header from "../../components/Header";

@observer
class HomeScreen extends React.Component {
    

    render() {
        return (
            <Container>
                <Header
                    showLogo={true}
                    title={"Charity Pool"}
                    noTopInsetPadding={true}
                    style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.12)" }}
                />
                <Content>
                    <InstructionContainer>
                        <InstructionHeader>
                            Help Your Favorite Cause
                        </InstructionHeader>
                        <InstructionText>
                            Contribute to the pool of donations. Vote for
                            your top 3 charities. At the end of the month,
                            the pool of donations will be given to the top 3
                            charities proportionately.
                        </InstructionText>
                    </InstructionContainer>
                    <AmountContainer>
                        <AmountDescriptionText>
                            {/* TODO: Pull from account system backend*/}
                            <AmountText>$1,500,000</AmountText> raised so
                            far.
                        </AmountDescriptionText>
                    </AmountContainer>
                    <CountDownContainer>
                        <CountDownDescriptionText>
                            {/* TODO: Pull from timer on backend*/}
                            <CountDownText>300</CountDownText> hours left
                            before donation day.
                        </CountDownDescriptionText>
                    </CountDownContainer>
                </Content>
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const Content = styled.div`
    margin: 32px 80px;
    width: calc(100% - 160px);
`;

const InstructionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    margin-top: 100px;
`;

const InstructionHeader = styled.div`
    font-size: 24px;
    padding-bottom: 16px;
    font-weight: 600;
`;

const InstructionText = styled.span`
    font-size: 16px;
    line-height: 20px;
    max-width: 600px;
    text-align: left;
`;

const AmountContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 100px;
`;

const AmountDescriptionText = styled.span`
    font-size: 16px;
    line-height: 20px;
    max-width: 600px;
    text-align: left;
`;

const AmountText = styled.span`
    font-size: 20px;
    font-weight: 600;
`;

const CountDownContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 32px;
`;

const CountDownDescriptionText = styled.span`
    font-size: 16px;
    line-height: 20px;
    max-width: 600px;
    text-align: left;
`;

const CountDownText = styled.span`
    font-size: 20px;
    font-weight: 600;
`;

export default HomeScreen;
