import PT from "prop-types";
import { Button, SelectField, LoadingSpinner } from "@boldcommerce/stacks-ui";
import TitleWithEditButton from "./TitleWithEditButton";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import AppContext from "../contexts/AppContext";


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

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
`;

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
    shopId,
    subscriptionIntervals,
    activeSubscription,
    activeSubscriptionId,
    isChangeSubscriptionIntervalLoading
  } = state;
  const {
    fetchSubscriptionIntervals,
    changeSubscriptionInterval
  } = methods;

  const [showForm, setShowForm] = useState(false);
  const [activeInterval, setActiveInterval] = useState();

  const onSaveButtonClick = () => {
    changeSubscriptionInterval({
      shopIdentifier: shopId,
      subscriptionIntervalId: activeInterval?.id,
      subscriptionId: activeSubscriptionId
    });

    setShowForm(false);
    onEdit && onEdit();
  };

  const onCancelButtonClick = () => {
    setShowForm(false);
    onEdit && onEdit();
  };

  const onChangeOption = (event) => {
    const matchOption = subscriptionIntervals?.find((option) => option.value === event.target.value);

    setActiveInterval(matchOption);
  };

  const onOpenForm = () => {
    setShowForm(true);
    onEdit && onEdit();
    fetchSubscriptionIntervals();
  };

  useEffect(() => {
    const matchOption = subscriptionIntervals?.find((option) => option.name === activeSubscription?.frequency);

    setActiveInterval(matchOption);
  }, [activeSubscriptionId]);

  return (
    <div>
      <StyledTitle>
        <TitleWithEditButton
          title="Order frequency"
          showEditButton={editMode}
          altTextButton="Change frequency"
          onEdit={onOpenForm}
        />
      </StyledTitle>

      {showForm ? (
        <StyledForm>
          <SelectField
            value={activeInterval?.value}
            options={subscriptionIntervals}
            onChange={onChangeOption}
          />
          <StyledButtons>
            <Button 
              className="button"
              primary 
              onClick={onSaveButtonClick}
            >
              Save
            </Button>
            <Button 
              className="button" 
              onClick={onCancelButtonClick}
            >
              Cancel
            </Button>
          </StyledButtons>
        </StyledForm>
      ) : (
        <StyledDescription>
          {isChangeSubscriptionIntervalLoading ? (
            <StyledSpinner>
              <LoadingSpinner />
            </StyledSpinner>
          ) : (
            activeSubscription?.frequency
          )}
          
        </StyledDescription>
      )}
    </div>
  );
};

OrderFrequency.propTypes = OrderFrequencyPropTypes;
OrderFrequency.defaultProps = OrderFrequencyDefaultProps;

export default OrderFrequency;
