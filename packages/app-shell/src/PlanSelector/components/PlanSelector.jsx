import React, { useEffect, useState } from 'react';
import Text from '@bufferapp/ui/Text';
import Switch from '@bufferapp/ui/Switch';
import Button from '@bufferapp/ui/Button';
import { SelectionScreen } from './SelectionScreen';
import { Summary } from './Summary';
import {
  ButtonContainer,
  SwitchContainer,
  PlanSelectorHeader,
  Right,
  Left,
  Container,
} from '../style';

export const PlanSelector = ({ planOptions }) => {
  const [selectedPlan, setselectedPlan] = useState(planOptions[0]);
  const [monthlyBilling, setBillingInterval] = useState(true);

  const currentPlan = planOptions.find((option) => option.isCurrentPlan);
  const currentPlanString = `${currentPlan.planId}_${currentPlan.planInterval}`;
  const selectedPlanString = selectedPlan
    ? `${selectedPlan.planId}_${selectedPlan.planInterval}`
    : '';

  const getLabel = () => {
    return currentPlanString === selectedPlanString
      ? 'Stay On My Current Plan'
      : 'Confirm Plan Change';
  };

  const [label, setLabel] = useState(getLabel());

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

  useEffect(() => {
    setLabel(getLabel());
  }, [selectedPlan]);

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
      <Right>
        <Summary
          planOptions={planOptions}
          selectedPlan={selectedPlan}
          location="planSelector"
        />
        <ButtonContainer>
          <Button
            type="primary"
            onClick={() => {}}
            label={label}
            fullWidth
            disabled={label === 'Stay On My Current Plan'}
          />
        </ButtonContainer>
      </Right>
    </Container>
  );
};
