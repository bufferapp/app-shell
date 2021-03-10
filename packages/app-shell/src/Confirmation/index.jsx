import React from 'react';

import { MODALS } from '../hooks/useModal';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';
import styled from 'styled-components';

const ScreenContainer = styled.div`
  width: 800px;
  height: 375px;
  background-image: url('https://buffer-ui.s3.amazonaws.com/Confirmation+Screen+-+Background.png');
  background-repeat: no-repeat;
  background-position-x: 90%;
  background-position-y: 27px;
`;

const Screen = () => {
  return (
    <ScreenContainer>
      <div>Header</div>
      <div>Description</div>
      <div>buttons</div>
    </ScreenContainer>
  );
};

const Confirmation = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal, data }) => <Screen />}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default Confirmation;
