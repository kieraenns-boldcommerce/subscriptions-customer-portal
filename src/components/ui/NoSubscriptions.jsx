import React from "react";
import styled from "styled-components";
import {Button} from "@boldcommerce/stacks-ui";

const StyledNoSubscriptions = styled.div`
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 40px;
    padding-bottom: 40px;

    color: var(--color-text-default);
`;

const StyledTitle = styled.div`
    margin-bottom: 10px;

    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
`;

const StyledText = styled.div`
    margin-bottom: 20px;

    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
`;

const NoSubscriptions = () => {
    return (
        <StyledNoSubscriptions>
            <StyledTitle>
                You don’t have an active subscription
            </StyledTitle>

            <StyledText>
                Continue shopping to find and subscribe to your favorite products
            </StyledText>

            <Button className="custom-button" primary>
                Continue shopping
            </Button>
        </StyledNoSubscriptions>
    );
};

export default NoSubscriptions;
