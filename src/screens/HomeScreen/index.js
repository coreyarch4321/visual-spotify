import React from "react";
import { observable, action, runInAction } from "mobx";
import { observer } from "mobx-react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import CharityCard from "../../components/CharityCard";
import Header from "../../components/Header";

@observer
class HomeScreen extends React.Component {
    @observable isLoading = false;

    componentDidMount() {
        this.initialize();
    }

    @action
    initialize = async () => {
        try {
            this.isLoading = true;
        } catch (err) {
            console.error(`Failed to initialize: ${err}`);
        } finally {
            runInAction(() => (this.isLoading = false));
        }
    };

    render() {
        if (this.isLoading) {
            return <CircularProgress color="secondary" />;
        } else {
            return (
                <Container>
                    <Header
                        showLogo={true}
                        title={"Charity Pool"}
                        noTopInsetPadding={true}
                        style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.12)" }}
                    />
                    <Content>
                        <CardContainer>
                            <CharityCard title={"Charity"} />
                        </CardContainer>
                    </Content>
                </Container>
            );
        }
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
`;

const CardContainer = styled.div`
    padding: 16px;
`;

export default HomeScreen;
