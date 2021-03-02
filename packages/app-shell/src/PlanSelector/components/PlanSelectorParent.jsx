import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from '@bufferapp/ui/Text';
import Switch from '@bufferapp/ui/Switch';
import { blue } from '@bufferapp/ui/style/colors';
import { SelectionScreen } from './SelectionScreen';
import { Summary } from './Summary';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  height: 550px;
  align-items: center;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid grey; //REMOVE THIS BEFORE MERGING!!!!
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  padding: 28px 24px 24px;
  height: 100%;
  justify-content: center;
  box-sizing: border-box;
`;

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
    color: ${blue};
  }

  p {
    color: #333333;
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
    <Container>
      <Left>
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
      </Left>
      <Summary
        planOptions={planOptions}
        selectedPlan={selectedPlan}
        location="planSelector"
      />
    </Container>
  );
};
