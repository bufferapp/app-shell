import React from 'react';
import Text from '@bufferapp/ui/Text';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import {
  Wrapper,
  CardContainer,
  CardHeader,
  CardFooter,
  CurrentLabel,
  Recommended,
  RadioButton,
  Price,
  BenefitList,
  Benefit,
} from '../style';

const Card = ({
  planId,
  planName,
  planInterval,
  description,
  highlights,
  currency,
  basePrice,
  priceNote,
  summary,
  isCurrentPlan,
  handlePlanSelection,
  selectedPlan,
  recommended,
}) => {
  return (
    <Wrapper
      tabIndex="0"
      onClick={(e) => handlePlanSelection(e.target.id)}
      id={`${planId}_${planInterval}`}
      selectedPlan={selectedPlan === planId}
      aria-label={selectedPlan === planId ? 'checked' : 'unchecked'}
    >
      {recommended && <Recommended>Recommended</Recommended>}
      <CardHeader>
        <Text type="h3">{planName}</Text>
        {isCurrentPlan && <CurrentLabel>Current</CurrentLabel>}
      </CardHeader>
      <RadioButton selectedPlan={selectedPlan === planId}>
        <CheckmarkIcon size="large" />
      </RadioButton>

      <Text type="p">{description}</Text>

      <CardFooter>
        <BenefitList>
          {highlights.map((benefit) => (
            <Benefit key={benefit}>
              <CheckmarkIcon />
              <Text type="p">{benefit}</Text>
            </Benefit>
          ))}
        </BenefitList>
        <Price>
          <sup>{currency}</sup>
          <Text type="h2" as="p">
            {basePrice}
          </Text>
          <sup
            aria-label={
              summary.intervalUnit === 'mo' ? 'per month' : 'per year'
            }
          >
            /{summary.intervalUnit}
          </sup>
        </Price>
        <Text htmlFor="foo" type="label" color="grayDark">
          {priceNote}
        </Text>
      </CardFooter>
    </Wrapper>
  );
};

export const SelectionScreen = ({
  planOptions,
  selectedPlan,
  handlePlanSelection,
  monthlyBilling,
}) => {
  return (
    <CardContainer>
      {planOptions
        .filter((option) => {
          if (monthlyBilling) {
            return option.planInterval === 'month';
          } else {
            return option.planInterval === 'year';
          }
        })
        .map((option) => (
          <Card
            {...option}
            isCurrentPlan={option.isCurrentPlan}
            key={`${option.planId}_${option.planInterval}`}
            handlePlanSelection={handlePlanSelection}
            selectedPlan={selectedPlan.planId}
            recommended={option.isRecommended}
          />
        ))}
    </CardContainer>
  );
};

SelectionScreen.propTypes = {};

SelectionScreen.defaultProps = {};
