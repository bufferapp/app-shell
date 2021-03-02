import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from '@bufferapp/ui/Text';
import Switch from '@bufferapp/ui/Switch';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import PropTypes from 'prop-types';
import { SelectionScreen } from './SelectionScreen';
import { Summary } from './Summary';

const PlanSelectorHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0px;
    color: #2c4bff;
  }

  p {
    color: rgb(61, 61, 61);
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    margin-left: 4px;
  }
`;

export const PlanSelectorParent = ({ planOptions }) => {
  const [selectedPlan, setselectedPlan] = useState(planOptions[0]);
  const [monthlyBilling, setBillingInterval] = useState(true);

  const handlePlanSelection = (planString) => {
    const [selectedPlanId, selectedPlanInterval] = planString.split('_');
    const selectedPlan = planOptions.find(
      (option) =>
        selectedPlanId === option.planId &&
        selectedPlanInterval === option.planInterval
    );
    setselectedPlan(selectedPlan);
  };

  useEffect(() => {
    const newInterval = monthlyBilling ? 'month' : 'year';
    handlePlanSelection(`${selectedPlan.planId}_${newInterval}`);
  }, [monthlyBilling]);

  return (
    <div>
      <PlanSelectorHeader>
        <Text type="h2">Change my plan</Text>
        <SwitchContainer>
          <Switch
            isOn={!monthlyBilling}
            handleSwitch={() => setBillingInterval(!monthlyBilling)}
            label="Monthly"
            id="switch-off"
          />
          <p>
            Yearly <span>20% discount</span>
          </p>
        </SwitchContainer>
      </PlanSelectorHeader>
      <SelectionScreen
        planOptions={planOptions}
        selectedPlan={selectedPlan}
        handlePlanSelection={handlePlanSelection}
        monthlyBilling={monthlyBilling}
      />
      <Summary
        selectedPlan={selectedPlan}
        planOptions={planOptions}
        location="planSelector"
      />
    </div>
  );
};
