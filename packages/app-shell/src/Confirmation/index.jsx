import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';
import getCopy from './getCopy';
import styled from 'styled-components';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import { black } from '@bufferapp/ui/style/colors';
import { useTrackPageViewed } from '../hooks/useSegmentTracking';

const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 376px;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position-x: right;
  background-position-y: bottom;
  background-image: url(${(props) => props.imageUrl});
  background-size: 445px;
  padding: 24px;

  p,
  h1 {
    color: ${black};
  }

  h1 {
    max-width: 324px;
    margin-top: 22px;
    margin-bottom: 22px;
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
  const { label, description, buttonCopy, imageUrl } = getCopy({
    planName,
    onlyUpdatedCardDetails,
    startedTrial,
  });

  const currentUser = useContext(UserContext);
  const { data } = useContext(ModalContext);
  useEffect(() => {
    const cta = data && data.cta ? data.cta : null;
    useTrackPageViewed({
      payload: {
        name: 'confirmation',
        title: 'planSelector',
        cta,
        ctaButton: cta,
      },
      user: currentUser,
    });
  }, []);

  return (
    <ScreenContainer imageUrl={imageUrl}>
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
