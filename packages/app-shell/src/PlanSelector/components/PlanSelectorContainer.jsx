import React, { useEffect, useState, useContext } from 'react';
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
  useTrackPlanSelectorViewed,
  useTrackPageViewed,
} from '../../hooks/useSegmentTracking';
import {
  ButtonContainer,
  SwitchContainer,
  PlanSelectorHeader,
  Right,
  Left,
  Container,
  AbsoluteSavings,
  HeaderLeft
} from '../style';
import useInterval from '../hooks/useInterval';
import { ModalContext } from '../../context/Modal';

export const PlanSelectorContainer = ({
  planOptions,
  user,
  openPaymentMethod,
  hasPaymentDetails,
  trialInfo,
  openSuccess,
  isFreePlan,
}) => {
  const { data: modalData, modal } = useContext(ModalContext);
  const { monthlyBilling, setBillingInterval } = useInterval(
    planOptions,
    isFreePlan
  );
  const { selectedPlan, updateSelectedPlan } = useSelectedPlan(
    planOptions,
    isFreePlan
  );
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
    isActiveTrial: trialInfo?.isActive,
    isAwaitingUserAction: trialInfo?.isAwaitingUserAction,
  });
  const { headerLabel } = useHeaderLabel(
    trialInfo?.isActive,
    planOptions,
    isFreePlan
  );

  useEffect(() => {
    const cta = modalData && modalData.cta ? modalData.cta : null;
    useTrackPlanSelectorViewed({
      payload: {
        currentPlan: `${selectedPlan.planId}_${selectedPlan.planInterval}`,
        screenName: headerLabel,
        cta,
        ctaButton: cta,
      },
      user,
    });

    useTrackPageViewed({
      payload: {
        name: 'Plan selection',
        title: 'Plan selector',
        cta,
        ctaButton: cta,
      },
      user,
    });
  }, []);

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
          {selectedPlan.planId !== 'free' && (
            <HeaderLeft>
              <SwitchContainer>
                <Switch
                  isOn={!monthlyBilling}
                  handleSwitch={() => setBillingInterval(!monthlyBilling)}
                  label="Monthly"
                  id="switch-off"
                />
                <p>Yearly</p>
              </SwitchContainer>
              <AbsoluteSavings>{selectedPlan.absoluteSavings}</AbsoluteSavings>
            </HeaderLeft>
          )}
        </PlanSelectorHeader>
        <SelectionScreen
          planOptions={planOptions}
          selectedPlan={selectedPlan}
          updateSelectedPlan={updateSelectedPlan}
          monthlyBilling={monthlyBilling}
        />
      </Left>
      <Right>
        <Summary selectedPlan={selectedPlan} fromPlanSelector={true} />
        <ButtonContainer>
          <Button
            type="primary"
            onClick={() =>
              action({ plan: selectedPlan, cta: label, ctaView: modal })
            }
            label={processing ? 'Processing...' : label}
            fullWidth
            disabled={label === 'Stay On My Current Plan' || processing}
          />
        </ButtonContainer>
      </Right>
    </Container>
  );
};
