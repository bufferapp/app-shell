import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import { blue, black } from '@bufferapp/ui/style/colors';
import PropTypes from 'prop-types';

const SummaryContainer = styled.div`
  min-width: 255px;
  background-color: #fcfcfc;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: inset 1px 0px 0px #bdbdbd;
  height: 100%;
  padding: 70px 0 24px;
  box-sizing: border-box;
  position: relative;
`;

const Body = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  height: calc(100% - 88px);
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 21px;
`;

const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 16px;
  margin-bottom: 0;

  p {
    margin-top: 0;
    margin-bottom: 8px;
    display: inline-block;
  }
`;

const Detail = styled.li`
  display: flex;
  align-items: baseline;

  :before {
    content: '';
    height: 4px;
    width: 4px;
    border-radius: 50%;
    border: 2px solid ${blue};
    display: inline-block;
    margin-right: 8px;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

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
    color: ${black};
    margin: 0 2px;
    font-size: 30px;
    line-height: 30px;
  }
`;

const ButtonContainer = styled.div`
  background: #f5f5f5;
  border-bottom-right-radius: 8px;
  height: 88px;
  padding: 24px 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-shadow: inset 1px 0px 0px #bdbdbd;
`;

export const Summary = ({ selectedPlan, planOptions, location }) => {
  const getLabel = () => {
    if (currentPlanString === selectedPlanString) {
      return 'Stay On My Current Plan';
    }
    if (location === 'planSelector') {
      return 'Confirm Plan Change';
    }
    if (location === 'creditCardForm') {
      return 'Confirm Payment';
    }
  };

  const [label, setLabel] = useState(getLabel());
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

  useEffect(() => {
    setLabel(getLabel());
  }, [selectedPlan]);

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
        <Bottom>
          <Price>
            <sup>{selectedPlan.currency}</sup>
            <Text type="h2" as="p">
              {selectedPlan.totalPrice}
            </Text>
            <sup>/{selectedPlan.summary.intervalUnit}</sup>
          </Price>
          <Text htmlFor="foo" type="label" color="grayDark">
            {/* {this ends up reading } # social channels x base price */}
            {`${selectedPlan.channelsQuantity} social channel${
              selectedPlan.channelsQuantity > 1 ? 's' : ''
            } x ${selectedPlan.currency}${
              selectedPlan.summary.intervalBasePrice
            }`}
          </Text>
        </Bottom>
      </Body>
      <ButtonContainer>
        <Button
          type="primary"
          onClick={() => {}}
          label={label}
          fullWidth
          disabled={label === 'Stay On My Current Plan'}
        />
      </ButtonContainer>
    </SummaryContainer>
  );
};
