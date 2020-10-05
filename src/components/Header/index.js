import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";

class Header extends React.Component {
    render() {
        const {
            children,
            title,
            rightComponent,
            style,
            showLogo,
            onClick,
        } = this.props;
        return (
            <HeaderWrapper
                onClick={onClick}
                data-qa-id="header-container"
                color="default"
                style={{
                    ...style,
                }}>
                {(showLogo || title || rightComponent) && (
                    <TopContainer data-qa-id="top-header-container">
                        <LeftContainer>
                            {showLogo && (
                                <StyledLogo data-qa-id="fixit-logo" src={""} />
                            )}
                            {title && (
                                <StyledTitle data-qa-id="header-title">
                                    {title}
                                </StyledTitle>
                            )}
                        </LeftContainer>
                        {rightComponent && (
                            <div data-qa-id="header-right-component">
                                {rightComponent}
                            </div>
                        )}
                    </TopContainer>
                )}
                {children}
            </HeaderWrapper>
        );
    }
}
const HeaderWrapper = withStyles({
    root: {
        backgroundColor: "white",
        boxShadow: "none",
        justifyContent: "center",
        zIndex: 99,
        position: "sticky",
        top: 0,
    },
})(AppBar);

const TopContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: none;
    margin-left: 80px;
    align-items: center;
`;

const StyledLogo = styled.img`
    margin-right: 10px;
    max-width: 25px;
    max-height: 25px;
`;

const LeftContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledTitle = styled.h1`
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 500;
    color: "#2D2D2D";
`;
export default Header;
