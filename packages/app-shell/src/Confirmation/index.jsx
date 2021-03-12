import React from 'react';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';
import useCopy from './hooks/useCopy';
import styled from 'styled-components';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import { black } from '@bufferapp/ui/style/colors';

const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 376px;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: bottom;
  background-image: url('https://buffer-ui.s3.amazonaws.com/Confirmation+Screen+-+Background.png');
  padding: 24px;

  p,
  h1 {
    color: ${black};
  }

  h1 {
    max-width: 324px;
  }

  p {
    margin-top: 0px;
    max-width: 282px;
  }
`;

const ButtonContainer = styled.div`
  width: fit-content;
  margin-top: 32px;
`;

const Screen = ({
  selectedPlan,
  onlyUpdatedCardDetails,
  startedTrial,
  closeModal,
}) => {
  const planName = selectedPlan.planName;
  const { label, description, buttonCopy } = useCopy({
    planName,
    onlyUpdatedCardDetails,
    startedTrial,
  });

  return (
    <ScreenContainer>
      <Text type="h1">{label}</Text>
      <Text type="p">{description}</Text>
      <ButtonContainer>
        <Button
          type="primary"
          onClick={() => {
            closeModal();
          }}
          label={buttonCopy}
        />
      </ButtonContainer>
    </ScreenContainer>
  );
};

const mockSelectedPlan = { planId: 'team', planName: 'Team' };
const onlyUpdatedCardDetails = false;
const startedTrial = false;

const Confirmation = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal, data }) => (
            <Screen
              selectedPlan={mockSelectedPlan} //data.selectedPlan
              onlyUpdatedCardDetails={onlyUpdatedCardDetails} //data.onlyUpdatedCardDetails
              startedTrial={startedTrial} //data.isTrial
              closeModal={() => {
                openModal(null);
              }}
            />
          )}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default Confirmation;
