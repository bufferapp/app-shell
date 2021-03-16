import React from 'react';
import Text from '@bufferapp/ui/Text';
import Notice from '@bufferapp/ui/Notice';
import Coupon from '@bufferapp/ui/Icon/Icons/Coupon';
import {
  DiscountReminder,
  TotalPrice,
  Detail,
  DetailList,
  Bottom,
  Body,
  SummaryContainer,
} from './style';
import { UserContext } from '../context/User';

const Summary = ({ planOptions, selectedPlan, fromPlanSelector }) => {
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
    if (!fromPlanSelector) {
      return false;
    }
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
        {fromPlanSelector ? (
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
        ) : (
          <DetailList>
            <Detail>
              <Text type="p">Paying for {selectedPlan.planName} plan</Text>
            </Detail>
            <Detail>
              <Text type="p">First payment today</Text>
            </Detail>
            <Detail>
              <Text type="p">Cancel billing anytime</Text>
            </Detail>
          </DetailList>
        )}
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
          {fromPlanSelector ? (
            <Text type="label" color="grayDark">
              {/* this ends up reading: # social channels x base price */}
              {`${selectedPlan.channelsQuantity} social channel${
                selectedPlan.channelsQuantity > 1 ? 's' : ''
              } x ${selectedPlan.currency}${
                selectedPlan.summary.intervalBasePrice
              }`}
            </Text>
          ) : (
            <Text type="label" color="grayDark">
              Includes tax
            </Text>
          )}
          {selectedPlan.planInterval === 'year' && (
            <DiscountReminder>
              <Coupon />
              <p>20% discount</p>
            </DiscountReminder>
          )}
        </Bottom>
      </Body>
    </SummaryContainer>
  );
};

const SummaryProvider = ({ selectedPlan, fromPlanSelector }) => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <Summary
          planOptions={user.currentOrganization.billing.changePlanOptions}
          selectedPlan={selectedPlan}
          fromPlanSelector={fromPlanSelector}
        />
      )}
    </UserContext.Consumer>
  );
};

export default SummaryProvider;
