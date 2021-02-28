import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '@bufferapp/ui/Text';
import Switch from '@bufferapp/ui/Switch';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import PropTypes from 'prop-types';

const PlanSelectorHeader = styled.header`
  width: 100%auto;
  display: flex;
  justify-content: space-between;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0px;
    color: #2c4bff;
  }

  p {
    color: rgb(61, 61, 61);
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    margin-left: 4px;
  }
`;

const Wrapper = styled.div`
  border: 1px solid #b8b8b8;
  border-radius: 3px;
  height: 420px;
  position: relative;
  padding: 21px;
  flex: 1 1 0px;
  margin-right: 12px;
  box-sizing: border-box;

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
  background-color: ${(props) => (props.selected ? 'blue' : 'transparent')};

  border: 1.5px solid #e0e0e0;
  transition: 0.2s all linear;
  margin-right: 5px;
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
  description,
  highlights,
  currency,
  basePrice,
  priceNote,
  summary,
  isCurrentPlan,
}) => {
  return (
    <Wrapper
      tabIndex="0"
      onClick={() => console.log('update currently selected plan')}
    >
      <CardHeader>
        <Text type="h3">{planName}</Text>
        {isCurrentPlan && <CurrentLabel>Current</CurrentLabel>}
      </CardHeader>
      <RadioButton />

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

export const SelectionScreen = ({ planOptions }) => {
  const [monthlyBilling, setBillingInterval] = useState(true);
  const currentPlan = planOptions.find((option) => option.isCurrentPlan);

  return (
    <>
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
              isCurrentPlan={
                currentPlan.planId === option.planId &&
                currentPlan.planInterval === option.planInterval
              }
              key={`${option.planId}_${option.planInterval}`}
            />
          ))}
      </CardContainer>
    </>
  );
};

SelectionScreen.propTypes = {};

SelectionScreen.defaultProps = {};
