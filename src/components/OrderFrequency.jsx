import { useState, useContext } from "react";
import styled from "styled-components";
import { Button, SelectField, LoadingSpinner } from "@boldcommerce/stacks-ui";
import TitleWithEditButton from "./ui/TitleWithEditButton";
import AppContext from "../contexts/AppContext";
import formatIntervalOption from "../utils/formatIntervalOption";

const StyledTitle = styled.div`
  margin-bottom: 10px;
`;

const StyledForm = styled.div`
  display: grid;
  grid-template-columns: 50% max-content;
  column-gap: 16px;

  @media (min-width: 576px) {
    column-gap: 20px;
  }

  @media (min-width: 768px) {
    row-gap: 10px;
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 50% max-content;
  }
`;

const StyledDescription = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
`;

// const StyledSpinner = styled.div`
//   display: flex;
//   align-items: center;
// `;

const StyledButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: max-content max-content;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const OrderFrequency = () => {
  const { appState, appActions } = useContext(AppContext);

  const {
    intervals,
    subscription,
    areIntervalsLoading,
    isAppLoading,
    showIntervalForm,
    isSubscriptionActive
  } = appState;

  const { startUpdateInterval, stopUpdateInterval, finishUpdateInterval } = appActions;

  const intervalOptions = intervals?.map(formatIntervalOption);

  const [intervalID, setIntervalID] = useState(null);

  const showEditButton = !areIntervalsLoading && isSubscriptionActive && !showIntervalForm;

  const onChangeOption = (event) => setIntervalID(event.target.value);

  const handleEditButtonClick = () => startUpdateInterval();
  const handleConfirmButtonClick = () => finishUpdateInterval(intervalID);
  const handleCancelButtonClick = () => stopUpdateInterval();

  return (
    <div>
      <StyledTitle>
        <TitleWithEditButton
          title="Order frequency"
          editButtonLabel="Change frequency"
          showEditButton={showEditButton}
          editButtonDisabled={isAppLoading}
          onEditButtonClick={handleEditButtonClick}
        />
      </StyledTitle>

      {areIntervalsLoading ? (
        <LoadingSpinner />
      ) : showIntervalForm ? (
        <StyledForm>
          <SelectField
            placeholder={intervalID ? "" : "Select interval"}
            value={intervalID}
            options={intervalOptions}
            disabled={isAppLoading}
            onChange={onChangeOption}
          />
          <StyledButtons>
            <Button
              className="button"
              primary
              disabled={isAppLoading}
              onClick={handleConfirmButtonClick}
            >
              Save
            </Button>
            <Button
              className="button"
              disabled={isAppLoading}
              onClick={handleCancelButtonClick}
            >
              Cancel
            </Button>
          </StyledButtons>
        </StyledForm>
      ) : (
        <StyledDescription>
          { subscription?.frequency }
        </StyledDescription>
      )}
    </div>
  );
};

export default OrderFrequency;
