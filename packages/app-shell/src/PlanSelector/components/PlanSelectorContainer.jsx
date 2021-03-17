import React, { useEffect, useState } from 'react';
import Text from '@bufferapp/ui/Text';
import Switch from '@bufferapp/ui/Switch';
import Button from '@bufferapp/ui/Button';
import { SelectionScreen } from './SelectionScreen';
import Summary from '../../Summary';
import useSelectedPlan from '../hooks/useSelectedPlan';
import useButtonOptions from '../hooks/useButtonOptions';
import useHeaderLabel from '../hooks/useHeaderLabel';
import useUpdateSubscriptionPlan from '../hooks/useUpdateSubscriptionPlan';
import {
  ButtonContainer,
  SwitchContainer,
  PlanSelectorHeader,
  Right,
  Left,
  Container,
} from '../style';
import useInterval from '../hooks/useInterval';

export const PlanSelectorContainer = ({
  planOptions,
  user,
  openPaymentMethod,
  hasPaymentDetails,
  isActiveTrial,
  openSuccess,
  isFreePlan
}) => {
  const { monthlyBilling, setBillingInterval } = useInterval(planOptions, isFreePlan);
  const { selectedPlan, updateSelectedPlan } = useSelectedPlan(planOptions, isFreePlan);
  const {
    updateSubscriptionPlan: updatePlan,
    data,
    error,
    processing,
  } = useUpdateSubscriptionPlan({ user, selectedPlan });
  const { label, action, updateButton } = useButtonOptions({
    selectedPlan,
    updatePlan,
    openPaymentMethod,
    hasPaymentDetails,
    isActiveTrial,
  });
  const { headerLabel } = useHeaderLabel(isActiveTrial, planOptions, isFreePlan);

  useEffect(() => {
    const newInterval = monthlyBilling ? 'month' : 'year';
    const planString = `${selectedPlan.planId}_${newInterval}`;
    updateSelectedPlan(planString);
  }, [monthlyBilling]);

  useEffect(() => {
    updateButton(selectedPlan);
  }, [selectedPlan]);

  useEffect(() => {
    if (data?.billingUpdateSubscriptionPlan) {
      openSuccess({ selectedPlan });
    }
  }, [data]);

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
        <Summary selectedPlan={selectedPlan} fromPlanSelector={true}/>
        <ButtonContainer>
          <Button
            type="primary"
            onClick={() => action({ plan: selectedPlan })}
            label={processing ? 'Processing...' : label}
            fullWidth
            disabled={label === 'Stay On My Current Plan' || processing}
          />
        </ButtonContainer>
      </Right>
    </Container>
  );
};
