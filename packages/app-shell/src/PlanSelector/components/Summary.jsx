import React from 'react';
import Text from '@bufferapp/ui/Text';
import Notice from '@bufferapp/ui/Notice';
import Checkmark from '@bufferapp/ui/Icon/Icons/Checkmark';
import {
  DiscountReminder,
  TotalPrice,
  Detail,
  DetailList,
  Bottom,
  Body,
  SummaryContainer,
} from './style';

export const Summary = ({ selectedPlan, planOptions }) => {
  const currentPlan = planOptions.find((option) => option.isCurrentPlan);
  const currentPlanString = `${currentPlan.planId}_${currentPlan.planInterval}`;
  const selectedPlanString = selectedPlan
    ? `${selectedPlan.planId}_${selectedPlan.planInterval}`
    : '';

  const getStatus = () => {
    if (currentPlanString === selectedPlanString) {
      return `Currently on the ${currentPlan.planName} plan`;
    } else {
      const indefiniteArticle =
        selectedPlan?.planName == 'Individual' ? 'an' : 'a';
      return `Changing to ${indefiniteArticle} ${selectedPlan?.planName} plan`;
    }
  };

  const shouldShowDowngradeWarning = () => {
    if (
      (currentPlan.planId === 'team' && selectedPlan.planId === 'individual') ||
      (currentPlan.planId === 'team' && selectedPlan.planId === 'free') ||
      (currentPlan.planId === 'individual' && selectedPlan.planId === 'free')
    ) {
      return true;
    }
  };

  return (
    <SummaryContainer>
      <Body>
        <Text type="h2">Summary</Text>
        <DetailList>
          <Detail>
            <Text type="p">{getStatus()}</Text>
          </Detail>
          {selectedPlan.summary.details.map((detail) => (
            <Detail key={detail}>
              <Text type="p">{detail}</Text>
            </Detail>
          ))}
        </DetailList>
        {shouldShowDowngradeWarning() && (
          <Notice type="warning">
            <Text>{selectedPlan.summary.warning}</Text>
          </Notice>
        )}
        <Bottom>
          <TotalPrice>
            <sup>{selectedPlan.currency}</sup>
            <Text type="h2" as="p">
              {selectedPlan.totalPrice}
            </Text>
            <sup
              aria-label={
                selectedPlan.summary.intervalUnit === 'mo'
                  ? 'per month'
                  : 'per year'
              }
            >
              /{selectedPlan.summary.intervalUnit}
            </sup>
          </TotalPrice>
          <Text type="label" color="grayDark">
            {/* this ends up reading: # social channels x base price */}
            {`${selectedPlan.channelsQuantity} social channel${
              selectedPlan.channelsQuantity > 1 ? 's' : ''
            } x ${selectedPlan.currency}${
              selectedPlan.summary.intervalBasePrice
            }`}
          </Text>
          {selectedPlan.planInterval === 'year' && (
            <DiscountReminder>
              <Checkmark />
              <p>20% discount</p>
            </DiscountReminder>
          )}
        </Bottom>
      </Body>
    </SummaryContainer>
  );
};
