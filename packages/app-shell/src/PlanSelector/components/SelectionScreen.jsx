import React from 'react';
import Text from '@bufferapp/ui/Text';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import AddIcon from '@bufferapp/ui/Icon/Icons/Add';
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

const ENTER_KEY = 13;
const SPACE_KEY = 32;

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
  updateSelectedPlan,
  selectedPlan,
  recommended,
}) => {
  return (
    <Wrapper
      tabIndex="0"
      onClick={(e) => {
        updateSelectedPlan(e.currentTarget.id);
      }}
      onKeyDown={(e) => {
        if (e.keyCode === ENTER_KEY || e.keyCode === SPACE_KEY)
          updateSelectedPlan(e.currentTarget.id);
      }}
      id={`${planId}_${planInterval}`}
      selectedPlan={selectedPlan === planId}
      aria-label={selectedPlan === planId ? 'checked' : 'unchecked'}
    >
      {recommended && <Recommended>Recommended</Recommended>}
      <CardHeader>
        <Text type="h3">{planName}</Text>
      </CardHeader>
      <RadioButton selectedPlan={selectedPlan === planId}>
        <CheckmarkIcon size="large" />
      </RadioButton>

      <Text type="p">{description}</Text>

      <CardFooter>
        <BenefitList>
          {highlights.map((benefit) => (
            <Benefit key={benefit}>
              {planId === 'team' ? <AddIcon /> : <CheckmarkIcon />}
              <Text type="p">{benefit}</Text>
            </Benefit>
          ))}
        </BenefitList>
        <Price>
          <sup>{currency}</sup>
          <Text type="h2" as="p">
            {basePrice}
          </Text>
        </Price>
        <Text type="label" color="grayDarker">
          {priceNote}
        </Text>
      </CardFooter>
    </Wrapper>
  );
};

export const SelectionScreen = ({
  planOptions,
  selectedPlan,
  updateSelectedPlan,
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
            updateSelectedPlan={updateSelectedPlan}
            selectedPlan={selectedPlan.planId}
            recommended={option.isRecommended}
          />
        ))}
    </CardContainer>
  );
};
