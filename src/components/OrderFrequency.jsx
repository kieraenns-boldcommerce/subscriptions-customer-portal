import PT from "prop-types";
import { Button, SelectField, LoadingSpinner } from "@boldcommerce/stacks-ui";
import TitleWithEditButton from "./TitleWithEditButton";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import AppContext from "../contexts/AppContext";


export const OrderFrequencyPropTypes = {
  onChange: PT.func,
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
    grid-template-columns: 2fr 1fr;
  }
`;

const StyledDescription = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
`;

const OrderFrequency = (props) => {
  const { editMode, onChange, onEdit } = props;

  const { state, methods } = useContext(AppContext);
  const {
    subscriptionIntervals,
    isSubscriptionIntervalsLoading,
    activeSubscription,
    activeShopId
  } = state;
  const {
    fetchSubscriptionIntervals,
    changeSubscriptionInterval
  } = methods;

  const [showForm, setShowForm] = useState(false);
  const [intervalOptions, setIntervalOptions] = useState([]);
  const [activeIntervalOption, setActiveIntervalOption] = useState();
  const [activeOrder, setActiveOrder] = useState();

  useEffect(() => {
    if (!subscriptionIntervals) return;

    const matchOption = subscriptionIntervals.find((option) => option.name === activeOrder);
    setActiveIntervalOption(matchOption);
  }, [activeOrder]);

  useEffect(() => {
    if (!activeSubscription) return;

    setActiveOrder(activeSubscription.orderText);
  }, [activeSubscription]);
  

  useEffect(() => {
    if (!subscriptionIntervals) return;

    const innerIntervalOptions = subscriptionIntervals.map((interval) => {
      const { name } = interval;

      return {
        name,
        value: name
      };
    });

    setActiveIntervalOption(subscriptionIntervals[0]);
    setIntervalOptions(innerIntervalOptions);
  }, [subscriptionIntervals]);
  

  const onSaveButtonClick = () => {
    onChange && onChange(activeIntervalOption);

    changeSubscriptionInterval({
      shopIdentifier: activeShopId,
      subscriptionIntervalId: activeIntervalOption.id,
      subscriptionId: activeSubscription.id
    });

    setShowForm(false);
  };

  const onChangeOption = (event) => setActiveOrder(event.target.value);

  const onOpenForm = () => {
    setShowForm(true);
    onEdit && onEdit();
    fetchSubscriptionIntervals();
  };
  

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

      {showForm && isSubscriptionIntervalsLoading ? (
        <LoadingSpinner />
      ) : showForm && !isSubscriptionIntervalsLoading ? (
        <StyledForm>
          <SelectField
            value={activeOrder}
            options={intervalOptions}
            onChange={onChangeOption}
          />
          <Button 
            className="button"
            primary 
            onClick={onSaveButtonClick}
          >
            Save
          </Button>
        </StyledForm>
      ) : (
        <StyledDescription>
          { activeOrder }
        </StyledDescription>
      )}
    </div>
  );
};

OrderFrequency.propTypes = OrderFrequencyPropTypes;
OrderFrequency.defaultProps = OrderFrequencyDefaultProps;

export default OrderFrequency;
