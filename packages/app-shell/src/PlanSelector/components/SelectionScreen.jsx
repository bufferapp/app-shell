import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '@bufferapp/ui/Text';
import Switch from '@bufferapp/ui/Switch';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  border: 1px solid #b8b8b8;
  border-radius: 3px;
  height: 420px;
  position: relative;
  padding: 21px;
  flex: 1 1 0px;
  margin-right: 12px;
  box-sizing: border-box;
  overflow: scroll;

  p {
    font-weight: 500;
    margin: 0;
  }

  h3 {
    margin: 0;
  }

  &:focus {
    box-shadow: 0 0 0 1px #2c4bff inset;
    outline: none;
  }

  &:hover {
    box-shadow: 0 0 0 1px #2c4bff inset;
    outline: none;
  }
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  div:last-child {
    margin-right: 0;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 16px;
`;

const CardFooter = styled.div`
  position: absolute;
  bottom: 21px;
`;

const CurrentLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  width: 64px;
  height: 25px;
  background: #f5f5f5;
  border-radius: 4px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.4px;
  color: #636363;
  text-transform: uppercase;
  margin-left: 12px;
  box-sizing: border-box;
`;

const RadioButton = styled.div`
  position: absolute;
  top: 21px;
  right: 21px;

  border-radius: 50%;
  width: 24px;
  height: 24px;
  background-color: ${(props) =>
    props.isselectedPlan ? 'blue' : 'transparent'};

  border: 1.5px solid #e0e0e0;
  transition: 0.2s all linear;
  margin-right: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: white;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  sup {
    font-family: Roboto;
    font-style: normal;
  }

  sup:first-child {
    font-weight: bold;
    font-size: 16px;
    line-height: 100%;
  }

  sup::last-child {
    font-weight: 900;
    font-size: 14px;
    line-height: 140%;
  }

  p {
    color: black;
    margin-left: 2px;
    margin-right: 2px;
  }
`;

const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 32px;
`;

const Benefit = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  svg {
    fill: #2c4bff;
    margin-right: 8px;
  }
`;

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
  isselectedPlan,
}) => {
  return (
    <Wrapper
      tabIndex="0"
      onClick={(e) => handlePlanSelection(e.target.id)}
      id={`${planId}_${planInterval}`}
    >
      <CardHeader>
        <Text type="h3">{planName}</Text>
        {isCurrentPlan && <CurrentLabel>Current</CurrentLabel>}
      </CardHeader>
      <RadioButton isselectedPlan={isselectedPlan.planId === planId}>
        <CheckmarkIcon size="large" />
      </RadioButton>

      <Text type="p">{description}</Text>

      <CardFooter>
        <BenefitList>
          {highlights.map((benefit) => (
            <Benefit>
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
          <sup>/{summary.intervalUnit}</sup>
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
    <>
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
              isselectedPlan={selectedPlan}
            />
          ))}
      </CardContainer>
    </>
  );
};

SelectionScreen.propTypes = {};

SelectionScreen.defaultProps = {};
