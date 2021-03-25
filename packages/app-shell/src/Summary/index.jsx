import React from 'react';
import Text from '@bufferapp/ui/Text';
import Coupon from '@bufferapp/ui/Icon/Icons/Coupon';
import Checkmark from '@bufferapp/ui/Icon/Icons/Checkmark';
import ArrowDown from '@bufferapp/ui/Icon/Icons/ArrowDown';
import ArrowUp from '@bufferapp/ui/Icon/Icons/ArrowUp';
import {
  DiscountReminder,
  TotalPrice,
  Detail,
  DetailList,
  Bottom,
  Body,
  SummaryContainer,
  BoldPrice,
  Separator,
  SummaryNote,
} from './style';
import { UserContext } from '../context/User';
import { freePlan } from '../mocks/freePlan';

const Summary = ({
  planOptions,
  selectedPlan,
  fromPlanSelector,
  isFreePlan,
  subscriptionEndDate,
}) => {
  const currentPlan = isFreePlan
    ? freePlan
    : planOptions.find((option) => option.isCurrentPlan);
  const currentPlanString = `${currentPlan.planId}_${currentPlan.planInterval}`;
  const selectedPlanString = selectedPlan
    ? `${selectedPlan.planId}_${selectedPlan.planInterval}`
    : '';

  const isDowngrading = (currentPlanId, selectedPlanId) => {
    if (currentPlanId === 'individual') {
      return selectedPlanId === 'free' ? true : false;
    }
    if (currentPlanId === 'team') {
      return true;
    }
    if (currentPlanId === 'free') {
      return false;
    }
  };

  const getStatus = () => {
    const [currentPlanId, currentPlanInterval] = currentPlanString.split('_');
    const [selectedPlanId, selectedPlanInterval] = selectedPlanString.split(
      '_'
    );

    let downgrade;
    let planStatus;
    let billingIntervalStatus;
    if (currentPlanId === selectedPlanId) {
      planStatus = `Currently on ${currentPlan.planName}`;
    } else {
      downgrade = isDowngrading(currentPlanId, selectedPlanId);
      planStatus = `${downgrade ? 'Downgrading' : 'Upgrading'} to ${
        selectedPlan?.planName
      }`;
    }

    if (currentPlanInterval !== selectedPlanInterval) {
      billingIntervalStatus = `Changing to ${selectedPlanInterval}ly billing`;
    }

    return (
      <>
        <Detail noBulletPoint>
          {downgrade === undefined && <Checkmark />}
          {downgrade === true && <ArrowDown />}
          {downgrade === false && <ArrowUp />}
          <Text type="p">{planStatus}</Text>
        </Detail>
        {billingIntervalStatus && (
          <Detail>
            <Text type="p">{billingIntervalStatus}</Text>
          </Detail>
        )}
        <Separator />
      </>
    );
  };

  const getPriceFooter = () => {
    if (fromPlanSelector) {
      if (selectedPlan.planId === 'free') {
        return null;
      }
      return (
        <Text type="label" color="grayDark">
          {/* this ends up reading: # social channels x base price */}
          {`${selectedPlan.channelsQuantity} social channel${
            selectedPlan.channelsQuantity > 1 ? 's' : ''
          } x `}
          {
            <BoldPrice>
              {selectedPlan.currency}
              {selectedPlan.summary.intervalBasePrice}
            </BoldPrice>
          }
        </Text>
      );
    } else {
      return (
        <Text type="label" color="grayDark">
          Includes tax
        </Text>
      );
    }
  };

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedSucriptionEndDate = new Date(
    subscriptionEndDate
  ).toLocaleDateString('en-US', dateOptions);

  return (
    <SummaryContainer>
      <Body>
        <Text type="h2">Summary</Text>
        {fromPlanSelector ? (
          <>
            <DetailList>
              {getStatus()}
              {selectedPlan.summary.details.map((detail) => (
                <Detail key={detail}>
                  <Text type="p">{detail}</Text>
                </Detail>
              ))}
            </DetailList>
            <Separator />
            <SummaryNote>
              {selectedPlan.planId === 'free' ? (
                <Text type="p">
                  Changing to Free will occur at the end of your next billing
                  cycle on <span>{formattedSucriptionEndDate}</span>
                </Text>
              ) : (
                <Text type="p">Cancel your plan at anytime</Text>
              )}
            </SummaryNote>
          </>
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
              {selectedPlan.planId === 'free'
                ? ''
                : `/${selectedPlan.summary.intervalUnit}`}
            </sup>
          </TotalPrice>
          {!selectedPlan.channelsQuantity ? '' : <>{getPriceFooter()}</>}
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
      {(user) => {
        return (
          <Summary
            planOptions={user.currentOrganization.billing.changePlanOptions}
            isFreePlan={
              user.currentOrganization.billing.subscription.plan?.id === 'free'
            }
            subscriptionEndDate={
              user.currentOrganization.billing.subscription.periodEnd
            }
            selectedPlan={selectedPlan}
            fromPlanSelector={fromPlanSelector}
          />
        );
      }}
    </UserContext.Consumer>
  );
};

export default SummaryProvider;
