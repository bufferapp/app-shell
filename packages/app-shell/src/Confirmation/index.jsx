import React from 'react';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';
import getCopy from './getCopy';
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
  const planName = selectedPlan ? selectedPlan.planName : null;
  const { label, description, buttonCopy } = getCopy({
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

const Confirmation = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal, data }) => (
            <Screen
              selectedPlan={data.selectedPlan}
              onlyUpdatedCardDetails={data.onlyUpdatedCardDetails}
              startedTrial={data.startedTrial}
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