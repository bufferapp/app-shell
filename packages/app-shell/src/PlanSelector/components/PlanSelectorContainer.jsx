import React, { useEffect, useState } from 'react';
import Text from '@bufferapp/ui/Text';
import Switch from '@bufferapp/ui/Switch';
import Button from '@bufferapp/ui/Button';
import { SelectionScreen } from './SelectionScreen';
import Summary from '../../Summary';
import useSelectedPlan from '../hooks/useSelectedPlan';
import useButtonOptions from '../hooks/useButtonOptions';
import useHeaderLabel from '../hooks/useHeaderLabel';
import {
  ButtonContainer,
  SwitchContainer,
  PlanSelectorHeader,
  Right,
  Left,
  Container,
} from '../style';

const updatePlan = () => {
  console.log('update plan');
};

export const PlanSelectorContainer = ({
  planOptions,
  openPaymentMethod,
  hasPaymentDetails,
  isActiveTrial,
}) => {
  const [monthlyBilling, setBillingInterval] = useState(true);

  const { selectedPlan, updateSelectedPlan } = useSelectedPlan(planOptions);
  const { label, action, updateButton } = useButtonOptions({
    selectedPlan,
    updatePlan,
    openPaymentMethod,
    hasPaymentDetails,
    isActiveTrial,
  });
  const { headerLabel } = useHeaderLabel(isActiveTrial, planOptions);

  useEffect(() => {
    const newInterval = monthlyBilling ? 'month' : 'year';
    const planString = `${selectedPlan.planId}_${newInterval}`;
    updateSelectedPlan(planString);
  }, [monthlyBilling]);

  useEffect(() => {
    updateButton(selectedPlan);
  }, [selectedPlan]);

  return (
    <Container>
      <Left>
        <PlanSelectorHeader>
          <Text type="h2">{headerLabel}</Text>
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
          updateSelectedPlan={updateSelectedPlan}
          monthlyBilling={monthlyBilling}
        />
      </Left>
      <Right>
        <Summary planOptions={planOptions} selectedPlan={selectedPlan} />
        <ButtonContainer>
          <Button
            type="primary"
            onClick={() => action(selectedPlan)}
            label={label}
            fullWidth
            disabled={label === 'Stay On My Current Plan'}
          />
        </ButtonContainer>
      </Right>
    </Container>
  );
};
