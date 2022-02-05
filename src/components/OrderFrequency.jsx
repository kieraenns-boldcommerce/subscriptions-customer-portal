import PT from "prop-types";
import { Button, SelectField } from "@boldcommerce/stacks-ui";
import TitleWithEditButton from "./TitleWithEditButton";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import AppContext from "../contexts/AppContext";

const formatIntervalOption = (interval) => {
  const { id: value, name } = interval;
  return { name, value };
};

export const OrderFrequencyPropTypes = {
  onEdit: PT.func,
  editMode: PT.bool
};

const OrderFrequencyDefaultProps = {
  editMode: false
};

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

const OrderFrequency = (props) => {
  const { editMode, onEdit } = props;

  const { state, methods } = useContext(AppContext);
  const {
    shopID,
    intervals,
    activeSubscription,
    activeSubscriptionId,
    isIntervalUpdating
  } = state;
  const {
    updateInterval
  } = methods;

  const [showForm, setShowForm] = useState(editMode);
  const [showEditButton, setShowEditButton] = useState(!editMode);
  const [activeIntervalID, setActiveIntervalID] = useState();

  useEffect(() => {
    setShowForm(editMode);
    setShowEditButton(!editMode);
  }, [editMode]);

  const isSubscriptionActive = activeSubscription?.status === "active";

  const intervalOptions = intervals?.map(formatIntervalOption);

  const onSaveButtonClick = () => {
    updateInterval({
      shopID: shopID,
      subscriptionID: activeSubscriptionId,
      intervalID: activeIntervalID
    });
  };

  const onCancelButtonClick = () => {
    setShowForm(false);
    setShowEditButton(true);
  };

  const onChangeOption = (event) => setActiveIntervalID(event.target.value);

  const onOpenForm = () => {
    setShowForm(true);
    setShowEditButton(false);
    onEdit && onEdit();
  };

  useEffect(() => {
    const matchOption = intervals?.find((interval) => interval.name === activeSubscription?.frequency);
    if (matchOption) setActiveIntervalID(matchOption.id);
  }, [showForm, activeSubscription, intervals]);

  useEffect(() => {
    if (isIntervalUpdating) return;

    setShowForm(false);
    setShowEditButton(true);
  }, [isIntervalUpdating]);

  return (
    <div>
      <StyledTitle>
        <TitleWithEditButton
          title="Order frequency"
          showEditButton={showEditButton && isSubscriptionActive}
          altTextButton="Change frequency"
          onEdit={onOpenForm}
        />
      </StyledTitle>

      {showForm && isSubscriptionActive ? (
        <StyledForm>
          <SelectField
            placeholder={activeIntervalID ? "" : "Select interval"}
            value={activeIntervalID}
            options={intervalOptions}
            disabled={isIntervalUpdating}
            onChange={onChangeOption}
          />
          <StyledButtons>
            <Button
              className="button"
              primary
              disabled={isIntervalUpdating}
              onClick={onSaveButtonClick}
            >
              Save
            </Button>
            <Button
              className="button"
              disabled={isIntervalUpdating}
              onClick={onCancelButtonClick}
            >
              Cancel
            </Button>
          </StyledButtons>
        </StyledForm>
      ) : (
        <StyledDescription>
          { activeSubscription?.frequency }
        </StyledDescription>
      )}
    </div>
  );
};

OrderFrequency.propTypes = OrderFrequencyPropTypes;
OrderFrequency.defaultProps = OrderFrequencyDefaultProps;

export default OrderFrequency;
